import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { emailConfirmationGET } from '../../api/auth';

const EmailConfirmationPage = ({ match }) => {
    const [validating, setValidating] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        emailConfirmation();
    }, []);

    async function emailConfirmation() {
        try {
            await emailConfirmationGET(match.params.code);

            
            setIsValid(true);
        } catch (e) {
            console.log(e);
        } finally {
            setValidating(false);
        }
    }

    function confirmationStatus() {
        if (!validating) {
            if (isValid) {
                return (
                    <div>
                        <Alert variant="success">
                            Seu e-mail foi verificado com sucesso! 🥳
                        </Alert>
                        <NavLink to="/entrar">Acessar minha conta</NavLink>
                    </div>
                )
            } else {
                return (
                    <Alert variant="danger">
                        Esse código é inválido.
                    </Alert>
                )
            }
        } else {
            return (
                <p>Verificando...</p>
            )
        }

    }
    
    return (
        <Container>
            <Row align="center">
                <Col>
                    <h1 align="center">Vitrine Rápida</h1>
                    {confirmationStatus()}
                </Col>
            </Row>
        </Container>
    )
}

export default EmailConfirmationPage;
