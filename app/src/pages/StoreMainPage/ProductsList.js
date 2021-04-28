import React, { useState, useEffect } from 'react';
import { shuffle, slice } from 'lodash';
import { Card, Button } from 'react-bootstrap';

import { StyledProductsContainer } from './style';

const MAX_NUMBER_OF_FEATURED_PRODUCTS = 9;

const StoreProductsList = ({ categories, products, selectedCategory, cartItems, onProductAddClick }) => {
    const [filteredProducts, setFilteredProducts] = useState(products);

    function wantMore(product) {
        const amount = cartItems.reduce((prev, curr) => {
            if (curr._id === product) {
                return prev + 1;
            }

            return prev;
        }, 0);

        return amount ? `Adicionado (${amount}x)` : 'Quero';
    }

    function showFeaturedProducts() {
        return slice(shuffle(products), 0, MAX_NUMBER_OF_FEATURED_PRODUCTS);
    }

    function list() {
        if (!categories.length || !products.length) {
            return (
                <p>Ainda não temos nenhum produto disponível.</p>
            )
        }

        if (!filteredProducts.length) {
            return (
                <p style={{ marginTop: 20 }}>Não há items para essa categoria no momento.</p>
            )
        }

        return filteredProducts.map(({ _id, name, description, pictureUrl, price, categoryId }) => {
            return (
                <div key={_id} style={{ display: 'flex', padding: 10 }}>
                    <Card style={{ width: '18rem' }} className="product-card">
                        <Card.Img
                            variant="top"
                            style={{ width: 285, height: 185 }}
                            src={pictureUrl}
                        />                        
                        <Card.Body style={{ minHeight: 230 }}>
                            <Card.Title>
                                <p style={{ margin: 0 }}>{name}</p>
                            </Card.Title>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p>{description}</p>
                                <p><b>R$ </b>{price.toFixed(2)}</p>
                            </div>
                            <Button
                                variant="primary"
                                className="add-item-button"
                                onClick={() => onProductAddClick({
                                    _id,
                                    name,
                                    price
                                })}
                            >
                                {wantMore(_id)}
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        });
    }

    useEffect(() => {
        if (!selectedCategory) {
            setFilteredProducts(showFeaturedProducts());
        } else {
            setFilteredProducts(products.filter(({ categoryId }) => categoryId === selectedCategory))
        }
    }, [selectedCategory]);

    return (
       <StyledProductsContainer hasProducts={filteredProducts.length}>
           {list()}
       </StyledProductsContainer>
    )
}

export default StoreProductsList;
