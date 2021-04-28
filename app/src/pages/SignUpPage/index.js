import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { signUpPOST } from '../../api/auth';

const styles = {
    formRow: {
        maxWidth: '500px'
    },
    submitButton: {
        width: '100%'
    },
    signInButton: {
        width: '100%',
        textAlign: 'center',
        display: 'block',
        marginTop: '30px'
    },
    invalidMessage: {
        color: 'red'
    }
}

const SignUpPage = () => {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatching, setPasswordsMatching] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [genericError, setGenericError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            signUp();
        }

        event.preventDefault();
        event.stopPropagation();
        
        setValidated(true);
    }

    async function signUp() {
        setLoading(true);
        setGenericError(false);
        setEmailError(false);

        try{
            await signUpPOST(firstName, lastName, email, password);
            setSuccess(true);
        }
        catch (e) {
            if (e.response && e.response.status === 409) {
                setEmailError(true);
            }
            else {
                setGenericError(true);
            }

            setLoading(false);     
        }
    }

    useEffect(() => {
        if (genericError) {
            setGenericError(false);
        }

        if (emailError) {
            setEmailError(false);
        }
    }, [firstName, lastName, email, password, confirmPassword]);

    useEffect(() => {
        if (password && confirmPassword && password === confirmPassword) {
            setPasswordsMatching(true);
        }
        else {
            setPasswordsMatching(false);
        }
    }, [password, confirmPassword]);

    function invalidMessage() {
        if (confirmPassword && !passwordsMatching) {
            return (
                <p style={styles.invalidMessage}>As senhas não casam!</p>
            )
        }
        
        return null;
    }

    function renderSignUpError() {
        if (emailError) {
            return (
                <Alert variant="danger">
                    Já existe uma conta criada com o e-mail <b>{email}</b>! 😥
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

    function renderSignUpSuccess() {
        if (success) {
            return (
                <Alert variant="success">
                    Agora você só precisa confirmar o seu e-mail. Dentro de instantes você receberá um link para confirmação em <b>{email}</b>.                    
                </Alert>
            )
        }

        return null;
    }
    
    return (
        <Container>
            <Row align="center">
                <Col>
                    <h1 align="center">Vitrine Rápida</h1>
                    <Row align="left" style={styles.formRow}>
                        <Col>
                            <h3>Criar conta</h3>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="firstName">
                                    <Form.Control
                                        required
                                        disabled={loading}
                                        type="text"
                                        placeholder="Nome"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="lastName">
                                    <Form.Control
                                        required
                                        disabled={loading}
                                        type="text"
                                        placeholder="Sobrenome"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Control
                                        required
                                        disabled={loading}
                                        type="email"
                                        placeholder="E-mail"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Control
                                        required
                                        disabled={loading}
                                        type="password"
                                        minLength="6"
                                        maxLength="15"
                                        placeholder="Senha"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        A senha deve ter entre 6 e 15 caracteres.
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Senha inválida.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="confirmPassword">
                                    <Form.Control
                                        required
                                        disabled={loading}
                                        type="password"
                                        minLength="6"
                                        maxLength="15"
                                        placeholder="Confirmar senha"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {invalidMessage()}                          
                                </Form.Group>

                                {renderSignUpError()}
                                {renderSignUpSuccess()}

                                <Button
                                    disabled={loading || !passwordsMatching}
                                    style={styles.submitButton}
                                    variant="primary"
                                    type="submit">
                                    Criar
                                </Button>

                                <NavLink style={styles.signInButton} to="/entrar">
                                    Entrar
                                </NavLink>
                                <NavLink disabled={loading} style={styles.signInButton} to="/">
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

export default SignUpPage;
