import styled, { css } from 'styled-components';

export const StyledLogo = styled.img`
    margin: 25px 0;
    width: 200px;
    height: 200px;
    border-radius: 50%;
`;

export const StyledDescription = styled.p`
    font-family: 'Roboto', sans-serif;
    max-width: 300px;
    font-weight: bold;
`;

export const StyledCategoriesMenu = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    padding: 0;

    .selected{
        background-color: #007bff;
        color: #ffffff;
    }
`;

export const StyledCategoriesMenuItem = styled.li`
    padding: 15px;
    cursor: pointer;
    user-select: none;
`;

export const StyledProductsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    ${({ hasProducts }) => !hasProducts && css`
        min-height: 437px;
    `}
`;

export const StyledCartFloatingButton = styled.button`
    position: fixed;
    z-index: 999;
    top: 20px;
    right: 20px;
    cursor: pointer;
    background: none;
    border: none;
    outline: none !important;
`;

export const StyledCartNumber = styled.p`
    background-color: orange;
    color: #ffffff;
`;

export const StyledCartModal = styled.div`
    display: none;
    border: 1px solid #888e94;
    width: 90%;
    min-height: 500px;
    position: fixed;
    top: 75px;
    left: 5%;
    z-index: 999999;
    background: #000000db;
    color: #ffffff;
    padding-bottom: 50px;

    ${({ isOpen, hasItems }) => (isOpen && hasItems) && css`
        display: block;
    `}

    h1{
        margin: 10px;
    }
`;

export const StyledCartItemsContainer = styled.ul`
    text-align: left;
    padding: 20px;

    li{
        display: flex;
        justify-content: space-between;

        &:last-of-type{
            padding-bottom: 5px;
            border-bottom: 1px solid #ffffff;
        }
    }
`;

export const StyledWhatsappButtonContainer = styled.a`
    position: absolute;
    bottom: 11px;
    left: 9%;
    width: 80%;
    padding: 20px 0;
    text-align: center;

    button{
        background-color: #90d573;
        font-weight: bold;
        color: #ffffff;
        border-radius: 40px;
        border: none;
        padding: 10px 20px;
        width: 100%;
        outline: none;
    }
`;

export const StyledTotalContainer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
`;

export const StyledDeleteItemFromCartContainer = styled.span`
    button{
        margin-right: 5px;
    }
`;

export const StyledAnotherFields = styled.div`
    margin-top: 50px;
`;

export const StyledBackToTopButton = styled.button`
    display: none;
    position: fixed;
    bottom: 50px;
    z-index: 999;
    right: 23px;
    background: none;
    background-color: #ffffff85;
    padding: 20px 30px;
    outline: none !important;
    border-radius: 50%;
    border: 0px solid #000;

    ${({ display }) => display && css`
        display: block;
    `}
`;
