import React from 'react';

import { StyledCartFloatingButton, StyledCartNumber } from './style';

import { ReactComponent as CartIcon } from '../../assets/shopping-cart.svg'

function CartFloatingButton({ handleCartFloatingButtonClick, cartItems }) {
    return (
        <StyledCartFloatingButton
            onClick={handleCartFloatingButtonClick}
        >
            <CartIcon />
            <StyledCartNumber>{cartItems.length}</StyledCartNumber>
        </StyledCartFloatingButton>
    )
}

export default CartFloatingButton;
