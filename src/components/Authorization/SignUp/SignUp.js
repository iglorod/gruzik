import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Form, Input, Button, Typography, Alert, Row, Col, Checkbox } from 'antd';

import Logo from '../../../assets/images/logoSimple.png';
//import { signUpAction } from '../../../../store/actions/authorization';
import { finishLoadingActionCreator } from '../../../store/actions/authorization';
import '../Authorization.css';

const SignUp = (props) => {
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
    let fieldsIsValid = true;

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

        fieldsIsValid = stateInputs[key].isValid && fieldsIsValid;
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
            <img src={Logo} alt={'logo'} />
            <Typography.Title className={'header-label'} level={3}>Sign up</Typography.Title>

            <Form {...layout} name="nest-messages" onFinish={signUpHandler} validateMessages={validateMessages}>
                {inputs}

                {
                    props.errorMessage !== null
                        ? <Alert message={props.errorMessage} type="error" />
                        : null
                }

            {/*<Checkbox className={'band-checkbox'} onChange={registerBandToggle}>I want to register a band</Checkbox>*/}

                <Button
                    type="primary"
                    className={'submit-btn'}
                    loading={props.authStart}
                    disabled={props.authStart}
                >
                    {'Sign Up'}
                </Button>

                <Row justify="end">
                    <Col span={24}>
                        <Link to="/sign-in" className={'redirect-link'}>
                            {'Already have an account? Sign in'}
                        </Link>
                    </Col>
                </Row>
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
