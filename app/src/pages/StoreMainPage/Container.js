import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowUp } from 'react-bootstrap-icons';

import { debounce } from "debounce";

import $ from 'jquery';


import CategoriesMenu from './CategoriesMenu';
import ProductsList from './ProductsList';
import CartFloatingButton from './CartFloatingButton';
import CartModal from './CartModal';

import { StyledLogo, StyledDescription, StyledBackToTopButton } from './style';

const DISPLAY_BACK_TO_TOP_BUTTON_THRESHOLD_SCROLL_Y = 450;

const StoreMainPageContainer = ({ store }) => {
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [displayBackToTopButton, setDisplayBackToTopButton] = useState(0);
    const [goingTop, setGoingTop] = useState(false);

    const { 
        name,
        description,
        logoUrl,
        whatsappNumber,
        categories,
        products
    } = store;

    const [selectedCategory, setSelectedCategory] = useState({});

    function onCategoryClick(_id) {
        if (selectedCategory === _id) {
            setSelectedCategory({});
        } else {
            setSelectedCategory(_id);
        }
    }

    function onProductAddClick(product) {
        setCartItems([
            ...cartItems,
            product
        ]);
    }

    function handleCartFloatingButtonClick() {
        if (cartItems.length) {
            setIsCartModalOpen(true);
        }
    }

    function closeModal() {
        setIsCartModalOpen(false);
    }

    function deleteItem(_id) {
        const clone = [ ...cartItems ];

        const index = clone.findIndex((item) => item._id === _id);

        clone.splice(index, 1);

        setCartItems(clone);
    }

    function handleScroll(e) {
        if (window.scrollY >= DISPLAY_BACK_TO_TOP_BUTTON_THRESHOLD_SCROLL_Y) {
            setDisplayBackToTopButton(1);
        } else if (displayBackToTopButton && !goingTop) {
            setDisplayBackToTopButton(0);
        }
    }

    function onScrollFinish() {
        return debounce(() => {
            setDisplayBackToTopButton(0);
            setGoingTop(false);
        });
    }

    function backToTop() {
        setGoingTop(true);
        $("html, body").animate({ scrollTop: 0 }, onScrollFinish());
    }

    useEffect(() => {
        const title = document.querySelector('title');
        title.text = name;
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [displayBackToTopButton]);

    return (
        <Container>
            <Row align="center">
                <Col>
                    <StyledLogo src={logoUrl} />

                    <StyledDescription>{description}</StyledDescription>

                    <CartFloatingButton
                        cartItems={cartItems}
                        handleCartFloatingButtonClick={handleCartFloatingButtonClick}
                    />

                    <CartModal
                        isOpen={isCartModalOpen}
                        cartItems={cartItems}
                        closeModal={closeModal}
                        deleteItem={deleteItem}
                        whatsappNumber={whatsappNumber}
                    />

                    <CategoriesMenu
                        categories={categories}
                        selectedCategory={selectedCategory._id}
                        onCategoryClick={onCategoryClick}
                    />

                    <ProductsList
                        products={products}
                        categories={categories}
                        selectedCategory={selectedCategory._id}
                        cartItems={cartItems}
                        onProductAddClick={onProductAddClick}
                    />
                  
                    <StyledBackToTopButton
                        display={displayBackToTopButton}
                        onClick={backToTop}
                    >
                        <ArrowUp />
                    </StyledBackToTopButton>

                    <p style={{ margin: '50px 0 0 0' }}>
                        Copyright © 2020 - Vitrine Rápida, Instagram: <a href="https://www.instagram.com/vitrinerapida">@vitrinerapida</a>
                    </p>               
                </Col>
            </Row>    
        </Container>
    )
}

export default StoreMainPageContainer;
