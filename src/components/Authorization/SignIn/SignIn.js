import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form, Input, Checkbox } from 'antd';

import { signInActionCreator } from '../../../store/actions/authorization';
import '../Authorization.css';
import SubmitButton from '../AuthUI/SubmitButton/SubmitButton';
import BottomNote from '../AuthUI/BottomNote/BottomNote';
import Alert from '../AuthUI/Alert/Alert';
import Head from '../AuthUI/Head/Head';

const SignIn = (props) => {
    const [rememberMe, setRememberMe] = useState(true);
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

    const signInHandler = () => {
        const userData = {}
        for (let key in stateInputs) {
            userData[key] = stateInputs[key].value;
        }

        props.signIn(userData, rememberMe);
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

    const rememberMeToggle = () => {
        setRememberMe(prevState => !prevState);
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
            <Head title='Sign In' />
            <Form {...layout} name="nest-messages" onFinish={signInHandler} validateMessages={validateMessages}>
                {inputs}

                <Checkbox className={'band-checkbox'} defaultChecked onChange={rememberMeToggle}>Remember me</Checkbox>

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
        email: state.auth.email,
        authStart: state.auth.authStart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (userData, rememberMe) => dispatch(signInActionCreator(userData, rememberMe)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
