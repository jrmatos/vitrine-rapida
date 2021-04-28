import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Button, Form, Row, Col } from 'react-bootstrap';

import { MAX_AMOUNT_OF_CATEGORIES } from '../../consts';

import { 
    getCategories as getCategoriesApi,
    saveNewCategory as saveNewCategoryApi,
    deleteCategory as deleteCategoryApi
} from '../../api/category';

import { StyledCategoriesContainer, StyledFormContainer } from './style';

const CategoriesPage = () => {
    const inputRef = useRef();
    const [newCategory, setNewCategory] = useState(null);
    const [categories, setCategories] = useState([]); 
    
    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        
        saveNewCategory();
    }

    function renderCategoriesList() {
        if (categories.length) {
            return categories.map(({ name, _id }) => {
                return (
                    <div key={name}>
                        <Button
                            variant="danger"
                            onClick={() => deleteCategory(_id)}
                        >x</Button>
                        <p>{name}</p>
                    </div>
                )
            })
        }

        return null;
    }

    async function deleteCategory(_id) {
        if (window.confirm("Deseja realmente remover essa categoria?")) {
            try {
                await deleteCategoryApi(_id);
                getCategories();
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    async function saveNewCategory() {
        try {
            const { data } = await saveNewCategoryApi(newCategory);

            setCategories([
                ...categories,
                data
            ]);
        }
        catch (e) {
            console.log(e);
            if (e.response.status === 409) {
                alert('Essa categoria já existe.');
            }

            if (e.response.status === 403) {
                alert(`Você atingiu o número máximo de ${MAX_AMOUNT_OF_CATEGORIES} categorias.`);
            }
        }
        finally {
            inputRef.current.value = "";
            setNewCategory(null);
        }
    }

    async function getCategories() {
        try {
            const { data } = await getCategoriesApi();
            setCategories(data)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <Container>
            <Row align="center">
                <Col>
                    <h1>Categorias</h1>
                    <p>Gerencie as categorias da loja aqui.</p>

                    <StyledFormContainer>
                        <Form align="left" onSubmit={handleSubmit}>
                            <h4>Nova categoria</h4>
                            <Form.Group as={Row} controlId="formCategory">
                                <Col>
                                    <Form.Control
                                        ref={inputRef}
                                        required
                                        type="text"
                                        placeholder="Nome"
                                        autoComplete="off"
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <NavLink
                                style={{ marginRight: 20 }}
                                to="/area-do-cliente"
                                className="btn btn-primary"
                            >
                                Voltar
                            </NavLink>

                            <Button
                                disabled={!newCategory}
                                variant="primary"
                                type="submit"
                            >
                                Criar
                            </Button>
                        </Form>
                    </StyledFormContainer>

                    <StyledCategoriesContainer>
                        {renderCategoriesList()}
                    </StyledCategoriesContainer> 
                </Col>
            </Row>
        </Container>
    )
}

export default CategoriesPage;
