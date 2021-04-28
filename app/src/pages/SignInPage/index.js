import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { signInPOST } from '../../api/auth';
import { setToken } from '../../storage';

const styles = {
    formRow: {
        maxWidth: '500px'
    },
    submitButton: {
        width: '100%'
    },
    signUpButton: {
        width: '100%',
        textAlign: 'center',
        display: 'block',
        marginTop: '30px'
    }
}

const SignInPage = () => {
    const history = useHistory();

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [notVerifiedEmail, setNotVerifiedEmail] = useState(false);
    const [genericError, setGenericError] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            signIn();
        }

        event.preventDefault();
        event.stopPropagation();
    
        setValidated(true);
    }


    async function signIn() {
        setGenericError(false)
        setInvalidCredentials(false);
        setLoading(true);

        try{
            const { data } = await signInPOST(email, password);

            setToken(data.token);
            
            if (data.user.role === 'super-admin') {
                history.push('/area-do-admin');
            }
            else {
                history.push('/area-do-cliente');
            }
        }
        catch (e) {
            console.log(e);

            if (e.response && e.response.status === 401) {
                setInvalidCredentials(true);
            }
            if (e.response && e.response.status === 403) {
                setNotVerifiedEmail(true);
            }
            else {
                setGenericError(true);
            }
        }
        finally {
            setLoading(false);
        }        
    }

    function renderSignInError() {
        if (invalidCredentials) {
            return (
                <Alert variant="danger">
                    Credenciais inválidas. 🤔
                </Alert>
            )
        }
        
        if (notVerifiedEmail) {
            return (
                <Alert variant="danger">
                    E-mail ainda não confirmado. Por favor, verifique a caixa de entrada do e-mail <b>{email}</b>.
                </Alert>
            )
        }

        if (genericError) {
            return (
                <Alert variant="danger">
                    Ocorreu um erro inesperado. 😕
                </Alert>
            )
        }

        return null;
    }

    useEffect(() => {
        if (genericError) {
            setGenericError(false);
        }

        if (invalidCredentials) {
            setInvalidCredentials(false);
        }

        if (notVerifiedEmail) {
            setNotVerifiedEmail(false);
        }
    }, [email, password]);
    

    return (
        <Container>
            <Row align="center">
                <Col>
                    <h1 align="center">Vitrine Rápida</h1>
                    <Row align="left" style={styles.formRow}>
                        <Col>
                            <h3>Entrar</h3>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="email"
                                        placeholder="E-mail"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Senha"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                {renderSignInError()}

                                <Button
                                    disabled={loading}
                                    style={styles.submitButton}
                                    variant="primary"
                                    type="submit"
                                >
                                    Entrar
                                </Button>

                                <NavLink disabled={loading} style={styles.signUpButton} to="/criar-conta">
                                    Criar conta
                                </NavLink>
                                <NavLink disabled={loading} style={styles.signUpButton} to="/">
                                    Ir para o site
                                </NavLink>
                            </Form>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default SignInPage;
