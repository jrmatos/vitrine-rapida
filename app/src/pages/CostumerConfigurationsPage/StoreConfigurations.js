import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import {
    getConfigs,
    updateConfigs as updateConfigsApi,
    updateLogo as updateLogoApi
} from '../../api/store';
import StoreLogo from './StoreLogo';

function StoreConfigurations({ configs }) {
    const [updating, setUpdating] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // fields
    const [name, setName] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [newLogo, setNewLogo] = useState(null);
    const [description, setDescription] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState(null);
    const [friendlyUrl, setFriendlyUrl] = useState(null);

    function handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            // do something
            console.log('do something');
            updateConfigs();
        }

        event.preventDefault();
        event.stopPropagation();
    
        setValidated(true);
    }

    function handleEditButtonClick() {
        setIsEditing(true);
    }

    function handleCancelEditStoreFields() {
        setIsEditing(false);
    }

    function toggleEditting(one, another) {
        return !isEditing ? one: another;
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
                    disabled={updating}
                    onClick={handleCancelEditStoreFields}
                    variant="primary"
                    type="button"
                    style={{ marginRight: 10 }}
                >
                    Cancelar
                </Button>
                <Button
                    disabled={updating}
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
        getConfigs()
            .then(({ data }) => {
                setName(data.name);
                setLogoUrl(data.logoUrl);
                setDescription(data.description);
                setWhatsappNumber(data.whatsappNumber);
                setFriendlyUrl(data.friendlyUrl);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    async function updateConfigs() {
        setUpdating(true);

        try{
            const response = await updateConfigsApi(
                name, description, whatsappNumber, friendlyUrl
            );
            setIsEditing(false);
        }
        catch (e) {
            if (e.response.status === 409) {
                alert('O nome ou url escolhida já existe.');
            }
            console.log(e);
        }
        finally{
            setUpdating(false);
        }
    }

    async function updateLogo(logo) {
        try{
            const { data } = await updateLogoApi(logo);
            console.log('data', data)
            setLogoUrl(data.newLogoUrl);
        }
        catch (e) {            
            console.log(e);
        }
    }

    function onLogoChange(newLogoFile) {
        updateLogo(newLogoFile)
    }

    useEffect(() => {
        fetchUpdatedConfigs();
    }, []);

    return (
        <Form className="form-section" align="left" noValidate validated={validated} onSubmit={handleSubmit}>
            <h3>Loja</h3>
            <Form.Group as={Row} controlId="formLogoUrl">
                <Form.Label column sm="2">
                    Logo
                </Form.Label>
                <Col sm="10">
                    <StoreLogo logoUrl={logoUrl} onLogoChange={onLogoChange} />
                    <Form.Text className="text-muted">
                        Escolha uma foto com resolução <b>200 × 200</b>.<br />
                    </Form.Text>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFirstName">
                <Form.Label column sm="2">
                    Nome
                </Form.Label>
                <Col sm="10">
                    {
                        toggleEditting(
                            <Form.Control plaintext readOnly defaultValue={name} />,
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nome"
                                onChange={(e) => setName(e.target.value)}
                            />
                        )
                    }
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDescription">
                <Form.Label column sm="2">
                    Descrição
                </Form.Label>
                <Col sm="10">
                    {
                        toggleEditting(
                            <Form.Control plaintext readOnly defaultValue={description} />,
                            <Form.Control
                                required
                                type="text"
                                placeholder="Descrição"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        )
                    }
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formWhatsappNumber">
                <Form.Label column sm="2">
                    Whatsapp
                </Form.Label>
                <Col sm="10">
                    {
                        toggleEditting(
                            <Form.Control plaintext readOnly defaultValue={whatsappNumber} />,
                            <Form.Control
                                required
                                type="text"
                                placeholder="Whatsapp"
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                            />
                        )
                    }
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formFriendlyUrl">
                <Form.Label column sm="2">
                    Url da loja
                </Form.Label>
                <Col sm="10">
                    {
                        toggleEditting(
                            <Form.Control plaintext readOnly defaultValue={friendlyUrl} />,
                            <Form.Control
                                required
                                type="text"
                                placeholder="Url da loja"
                                onChange={(e) => setFriendlyUrl(e.target.value)}
                            />
                        )
                    }
                    {
                        friendlyUrl && (
                            <a href={`http://vitrinerapida.site/${friendlyUrl}`} target="_blank" >
                                Ver site
                            </a>
                        )
                    }
                </Col>
            </Form.Group>

            {renderEditButton()}
            {renderEditingButtons()}
        </Form>
    )
}

export default StoreConfigurations;
