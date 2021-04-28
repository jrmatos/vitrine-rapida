import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { orderBy } from 'lodash';

import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { MAX_AMOUNT_OF_PRODUCTS } from '../../consts';

import { 
    getCategories as getCategoriesApi
} from '../../api/category';

import {
    saveNewProduct as saveNewProductApi,
    getProducts as getProductsApi,
    deleteProduct as deleteProductApi
} from '../../api/product';

import { StyledCategoriesContainer, StyledFormContainer } from './style';

const ProductsPage = () => {
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const pictureInputRef = useRef();
    const priceInputRef = useRef();
    const categoryInputRef = useRef();
    const [newProduct, setNewProduct] = useState(null);
    const [categories, setCategories] = useState([]); 
    const [products, setProducts] = useState([]); 
    
    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!newProduct.categoryId) {
            alert('Escolha uma categoria para o produto.');
        } else {
            saveNewProduct();
        }
    }

    function renderProductsList() {
        if (products.length) {
            const orderedProducts = orderBy(products, 'createdAt', ['desc']);
            return orderedProducts.map(({ name, description, price, pictureUrl, categoryId, _id }) => {
                return (
                    <div key={_id} style={{ display: 'flex', padding: 10 }}>
                        <Card style={{ width: '18rem' }} className="product-card">
                            <Card.Img
                                variant="top"
                                style={{ width: 285, height: 185 }}
                                src={pictureUrl}                                                
                            />
                            <Card.Body>
                                <Card.Title>
                                    <p style={{ margin: 0 }}>{name}</p>
                                </Card.Title>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p><b>R$ </b>{price.toFixed(2)}</p>
                                    <p><b>Descrição:</b> {description}</p>
                                    <p><b>Categoria: </b>{getCategoryNameFromId(categoryId)}</p>
                                </div>
                                <Button variant="danger" onClick={() => deleteProduct(_id)}>Excluir</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })
        }

        return null;
    }

    async function deleteProduct(_id) {
        if (window.confirm("Deseja realmente remover esse produto?")) {
            try {
                await deleteProductApi(_id);
                getProducts();
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    async function saveNewProduct() {
        try {
            const { data } = await saveNewProductApi(newProduct);

            setProducts([
                ...products,
                data
            ]);
        }
        catch (e) {
            console.log(e);
            if (e.response.status === 409) {
                alert('Esse produto já existe.');
            }
            
            if (e.response.status === 403) {
                alert(`Você atingiu o número máximo de ${MAX_AMOUNT_OF_PRODUCTS} produtos.`);
            }
        }
        finally {
            nameInputRef.current.value = "";
            descriptionInputRef.current.value = "";
            pictureInputRef.current.value = "";
            priceInputRef.current.value = null;
            categoryInputRef.current.value = "";
            setNewProduct(null);
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

    async function getProducts() {
        try {
            const { data } = await getProductsApi();
            setProducts(data)
        }
        catch (e) {
            console.log(e);
        }
    }

    function updateNewProductState(fieldName, value) {
        const newProductState = {
            ...newProduct,
            [fieldName]: value
        };

        setNewProduct(newProductState);
    }

    function getCategoryNameFromId(categoryId) {
        const category = categories.find(({ _id }) => _id === categoryId);

        if (category) {
            return category.name;
        }

        return "Sem categoria. Esse produto não vai aparecer na sua loja."
    }

    useEffect(() => {
        getCategories();
        getProducts();
    }, [])

    return (
        <Container>
            <Row align="center">
                <Col>
                    <h1>Produtos</h1>
                    <p>Gerencie os produtos da loja aqui.</p>

                    <StyledFormContainer>
                        <Form align="left" onSubmit={handleSubmit}>
                            <h4>Novo produto</h4>
                            <Form.Group as={Row} controlId="formName">
                                <Col>
                                    <Form.Control
                                        ref={nameInputRef}
                                        required
                                        type="text"
                                        placeholder="Nome"
                                        autoComplete="off"
                                        onChange={(e) => updateNewProductState('name', e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formDescription">
                                <Col>
                                    <Form.Control
                                        ref={descriptionInputRef}
                                        required
                                        type="text"
                                        placeholder="Descrição"
                                        autoComplete="off"
                                        onChange={(e) => updateNewProductState('description', e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPictureUrl">
                                <Col>
                                    <Form.Control
                                        ref={pictureInputRef}
                                        type="file"
                                        required
                                        multiple={false}
                                        accept=".png, .jpg, .jpeg"
                                        placeholder="Foto URL"
                                        autoComplete="off"
                                        onChange={(e) => updateNewProductState('picture', e.target.files[0])}
                                    />
                                    <Form.Text className="text-muted">
                                        Escolha uma foto com resolução <b>285 × 185</b>.<br />
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPrice">
                                <Col>
                                    <Form.Control
                                        ref={priceInputRef}
                                        required
                                        type="number"
                                        step="0.01"
                                        placeholder="Preço"
                                        autoComplete="off"
                                        onChange={(e) => updateNewProductState('price', e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formCategory">
                                <Col>
                                    <Form.Control
                                        ref={categoryInputRef}
                                        as="select"
                                        custom
                                        onChange={(e) => updateNewProductState('categoryId', e.target.value)}
                                    >
                                        <option value="">Escolha uma categoria</option>
                                        {categories.map(({ _id, name }) => {
                                            return (
                                                <option key={_id} value={_id}>{name}</option>
                                            )
                                        })}                                        
                                    </Form.Control>
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
                                disabled={!newProduct}
                                variant="primary"
                                type="submit"
                            >
                                Criar
                            </Button>
                        </Form>
                    </StyledFormContainer>

                    <StyledCategoriesContainer>
                        {renderProductsList()}
                    </StyledCategoriesContainer> 
                </Col>
            </Row>
        </Container>
    )
}

export default ProductsPage;
