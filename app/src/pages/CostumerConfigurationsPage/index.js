import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import StoreConfigurations from './StoreConfigurations';
import AccountConfigurations from './AccountConfigurations';
import PasswordConfigurations from './PasswordConfigurations';

import { StyledConfigurationsContainer } from './style';

const CostumerConfigurationsPage = () => {
    return (
        <Container>
            <Row align="center">
                <Col>
                    <h1>Configurações</h1>
                    <p>Altere dados da loja e de sua conta aqui.</p>
                    
                    <StyledConfigurationsContainer>
                        <StoreConfigurations />
                        <AccountConfigurations />
                        <PasswordConfigurations />                    
                    </StyledConfigurationsContainer>
                   
                    <NavLink to="/area-do-cliente" className="btn btn-primary">Voltar</NavLink>
                </Col>
            </Row>
        </Container>
    )
}

export default CostumerConfigurationsPage;
