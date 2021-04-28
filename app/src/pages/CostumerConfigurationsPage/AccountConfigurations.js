import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { fetchMeFromToken } from '../../api/auth';

function AccountConfigurations() {
    const [validated, setValidated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // fields
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);


    function handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            // do something
            console.log('do something');
        }

        event.preventDefault();
        event.stopPropagation();

        setValidated(true);
    }

    function handleEditButtonClick() {
        setIsEditing(true);
    }

    function toggleEditting(one, another) {
        return !isEditing ? one : another;
    }

    function renderEditButton() {
        if (!isEditing) {
            return (
                <Button
                    variant="primary"
                    onClick={handleEditButtonClick}
                >
                    Editar
                </Button>
            )
        }
    }

    function handleCancelButtonClick() {
        setIsEditing(false);
    }

    function renderEditingButtons() {
        if (isEditing) {
            return (
                <>
                <p style={{ color: 'red' }}>Funcionalidade ainda não implementada.</p>
                <Button
                        style={{ marginRight: '10px' }}
                        variant="primary"
                        onClick={handleCancelButtonClick}
                    >
                        Cancelar
                </Button>
                <Button
                        disabled
                        variant="success"
                        type="submit"
                    >
                        Salvar
                </Button>
                </>
            )
        }

        return null;
    }

    function fetchUpdatedConfigs() {
        fetchMeFromToken()
            .then(({ data }) => {
                const { user } = data;

                setFirstName(user.firstName);
                setLastName(user.lastName);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    useEffect(() => {
        fetchUpdatedConfigs();
    }, []);

    return (
        <Form className="form-section" align="left" noValidate validated={validated} onSubmit={handleSubmit}>
            <h3>Conta</h3>
            <Form.Group as={Row} controlId="formFirstName">
                <Form.Label column sm="2">
                    Nome
                </Form.Label>
                <Col sm="10">
                    {
                        toggleEditting(
                            <Form.Control plaintext readOnly defaultValue={firstName} />,
                            <Form.Control type="text" placeholder="Nome" />
                        )
                    }
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formLastName">
                <Form.Label column sm="2">
                    Sobrenome
                </Form.Label>
                <Col sm="10">
                    {
                        toggleEditting(
                            <Form.Control plaintext readOnly defaultValue={lastName} />,
                            <Form.Control type="text" placeholder="Sobrenome" />
                        )
                    }
                </Col>
            </Form.Group>

            {renderEditButton()}
            {renderEditingButtons()}
        </Form>
    )
}

export default AccountConfigurations;
