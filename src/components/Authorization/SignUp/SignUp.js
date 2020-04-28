import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form, Checkbox } from 'antd';

//import { signUpAction } from '../../../../store/actions/authorization';
import { finishLoadingActionCreator } from '../../../store/actions/authorization';
import '../Authorization.css';
import SubmitButton from '../AuthUI/SubmitButton/SubmitButton';
import BottomNote from '../AuthUI/BottomNote/BottomNote';
import Alert from '../AuthUI/Alert/Alert';
import Head from '../AuthUI/Head/Head';
import Inputs from '../AuthUI/Inputs/Inputs';

const SignUp = (props) => {
    const { finishLoading } = props;

    const [isBand, setIsBand] = useState(false);

    const [stateInputs, setStateInputs] = useState({
        email: {
            config: {
                name: 'email',
                label: 'Email',
            },
            validationRules: {
                required: true,
                type: 'email',
            },
            value: '',
        },
        password: {
            config: {
                type: 'password',
                name: 'password',
                label: 'Password',
            },
            validationRules: {
                required: true,
                type: 'string',
                min: 6,
            },
            value: '',
        },
    });

    useEffect(() => {
        finishLoading();
    }, [finishLoading])

    useEffect(() => {
        if (isBand) {
            const bandData = {
                name: {
                    config: {
                        name: 'name',
                        label: 'Band name',
                    },
                    validationRules: {
                        required: true,
                        type: 'string',
                        min: 2,
                    },
                    value: '',
                },
                genres: {
                    config: {
                        type: 'text',
                        name: 'genres',
                        label: 'Genres',
                    },
                    validationRules: {
                        required: true,
                    },
                    value: '',
                },
            }

            setStateInputs({ ...bandData, ...stateInputs });
        } else if (Object.keys(stateInputs).length > 2) {
            let stateInputsClone = { ...stateInputs };
            delete stateInputsClone.name;
            delete stateInputsClone.genres;
            setStateInputs({ ...stateInputsClone });
        }
    }, [isBand])

    const signUpHandler = (values) => {
        console.log(values);
        /*        const newUser = {
                    email: stateInputs.email.value,
                    password: stateInputs.password.value
                };
        
                try {
                    props.onSignUp(newUser);
                } catch (error) {
                    console.log(error);
                }*/
    }

    const onChangeHandler = (inputName, event) => {
        const newValue = (inputName === 'genres') ? event : event.target.value;
        setStateInputs(prevState => ({
            ...prevState,
            [inputName]: {
                ...prevState[inputName],
                value: newValue,
            }
        }));
    }

    const registerBandToggle = () => {
        setIsBand(prevState => !prevState);
    }

    const validateMessages = {
        types: {
            email: '${label} is not valid!',
        },
        string: {
            min: '${label} must be at least ${min} characters',
        },
    };

    if (props.userId) return (
        <Redirect to={'/'} />
    )

    const layout = {
        labelCol: {
            sm: { offset: 2, span: 4 },
            md: { offset: 4, span: 4 },
            lg: { offset: 6, span: 2 },
        },
        wrapperCol: {
            sm: { span: 12 },
            md: { span: 8 },
            lg: { span: 8 },
        },
    };

    return (
        <React.Fragment>
            <Head title='Sign Up' />
            <Form {...layout} name="nest-messages" onFinish={signUpHandler} validateMessages={validateMessages}>

                <Inputs stateInputs={stateInputs} onChangeHandler={onChangeHandler} />

                <Alert errorMessage={props.errorMessage} />

                <Checkbox className={'band-checkbox'} onChange={registerBandToggle}>I want to sign up as a band</Checkbox>

                <SubmitButton authStart={props.authStart} label={'Sign Up'} />
                <BottomNote to='/sign-in' note='Already have an account? Sign In' />
            </Form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        userId: state.auth.id,
        authStart: state.auth.authStart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //onSignUp: (newUser) => dispatch(signUpAction(newUser)),
        finishLoading: () => { dispatch(finishLoadingActionCreator()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
