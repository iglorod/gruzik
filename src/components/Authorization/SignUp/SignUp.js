import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form, Checkbox } from 'antd';

import { signUpActionCreator } from '../../../store/actions/authorization';
import '../Authorization.css';
import SubmitButton from '../AuthUI/SubmitButton/SubmitButton';
import BottomNote from '../AuthUI/BottomNote/BottomNote';
import Alert from '../AuthUI/Alert/Alert';
import Head from '../AuthUI/Head/Head';
import Inputs from '../AuthUI/Inputs/Inputs';

const SignUp = (props) => {
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
        if (isBand) {
            const bandData = {
                bandName: {
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
            delete stateInputsClone.bandName;
            delete stateInputsClone.genres;
            setStateInputs({ ...stateInputsClone });
        }
    }, [isBand])

    const signUpHandler = () => {
        const newUser = {}
        for (let key in stateInputs) {
            newUser[key] = stateInputs[key].value;
        }

        props.signUp(newUser);
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

    if (props.email) return (
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

                <Checkbox className={'band-checkbox'} onChange={registerBandToggle}>I want to sign up as a band</Checkbox>

                <Alert errorMessage={props.errorMessage} />

                <SubmitButton authStart={props.authStart} label={'Sign Up'} />
                <BottomNote to='/sign-in' note='Already have an account? Sign In' />
            </Form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        email: state.auth.email,
        authStart: state.auth.authStart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUpActionCreator(newUser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
