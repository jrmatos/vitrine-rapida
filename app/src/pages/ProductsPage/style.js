import styled from 'styled-components';

export const StyledCategoriesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    div {
        display: flex;
        align-items: baseline;
        margin-bottom: 10px;

        button {
            margin-right: 5px;
        }
    }
`;

export const StyledFormContainer = styled.div`
    form {
        margin-bottom: 50px;

        input, select{
            width: 300px;
        }
    }
`;
