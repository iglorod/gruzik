import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form, Input } from 'antd';

//import { signUpAction } from '../../../../store/actions/authorization';
import { finishLoadingActionCreator } from '../../../store/actions/authorization';
import '../Authorization.css';
import SubmitButton from '../AuthUI/SubmitButton/SubmitButton';
import BottomNote from '../AuthUI/BottomNote/BottomNote';
import Alert from '../AuthUI/Alert/Alert';
import Head from '../AuthUI/Head/Head';

const SignIn = (props) => {
    const { finishLoading } = props;

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

    const signInHandler = (values) => {
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
        const newValue = event.target.value;

        setStateInputs(prevState => ({
            ...prevState,
            [inputName]: {
                ...prevState[inputName],
                value: newValue,
            }
        }));
    }

    const validateMessages = {
        types: {
            email: '${label} is not valid!',
        },
        string: {
            min: '${label} must be at least ${min} characters',
        },
    };

    let inputs = [];

    for (let key in stateInputs) {
        inputs.push(
            <Form.Item
                key={key}
                name={stateInputs[key].config.name}
                label={stateInputs[key].config.label}
                rules={[stateInputs[key].validationRules]}>
                <Input
                    type={stateInputs[key].config.type}
                    value={stateInputs[key].value}
                    onChange={onChangeHandler.bind(this, key)}
                />
            </Form.Item>
        );
    }

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
            <Head title='Sign In' />
            <Form {...layout} name="nest-messages" onFinish={signInHandler} validateMessages={validateMessages}>
                {inputs}

                <Alert errorMessage={props.errorMessage} />

                <SubmitButton authStart={props.authStart} label={'Sign In'} />

                <BottomNote to='/sign-up' note={'Don\'t have an account? Sign Up'} />
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
        //onSignIn: (newUser) => dispatch(signInAction(newUser)),
        finishLoading: () => { dispatch(finishLoadingActionCreator()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
