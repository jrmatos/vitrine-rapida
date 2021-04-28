import styled from 'styled-components';

export const StyledConfigurationsContainer = styled.div`
    label{
        font-weight: bold;
    }
    .form-section {
        margin-bottom: 50px;
    }
`;

export const StyledHeader = styled.div`
    background: #03A9F4;
    color: white;
    padding: 25px;
    margin-bottom: 10px;
    border-radius: 5px;
`;

export const StyledStoreLogo = styled.div`
    position: relative;
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
    span {
        position: absolute;
        bottom: 0;
        left: 0;
        cursor: pointer;
        color: #ffffff;
        background-color: #000000;
        padding: 5px 10px;
        border-radius: 5px;
    }
`;
