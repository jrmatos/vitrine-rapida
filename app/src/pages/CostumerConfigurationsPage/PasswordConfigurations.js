import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function PasswordConfigurations() {
    const [validated, setValidated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // fields
    const [firstName, setFirstName] = useState("Francisca");
    const [lastName, setLastName] = useState("Silva");


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

    function handleCancelButtonClick() {
        setIsEditing(false);
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

    function renderEditingButtons() {
        if (isEditing) {
            return (
                <>
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

    function renderForm() {
        if (isEditing) {
            return (
                <>
                    <Form.Group as={Row} controlId="formPass">
                        <Form.Label column sm="2">
                            Senha antiga
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Senha antiga" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formNewPass">
                        <Form.Label column sm="2">
                            Nova senha
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Nova senha" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formConfirmNewPass">
                        <Form.Label column sm="2">
                            Confirmar senha
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Confirmar senha" />
                        </Col>
                    </Form.Group>

                    <p style={{ color: 'red' }}>Funcionalidade ainda não implementada.</p>
                </>
            )
        }

        return (
            <p>Trocar senha.</p>
        )
    }

    return (
        <Form className="form-section" align="left" noValidate validated={validated} onSubmit={handleSubmit}>
            <h3>Senha</h3>

            {renderForm()}

            {renderEditButton()}
            {renderEditingButtons()}
        </Form>
    )
}

export default PasswordConfigurations;
