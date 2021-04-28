import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';

import { clear } from '../../storage';

import { StyledUl } from './style';

const CostumerMenu = ({ user }) => {
    const history = useHistory();

    function logout(e) {
        e.preventDefault();

        clear();
        history.push('/');
    }

    return (
        <Container>
            <Row align="center">
                <Col>
                    <h1>Área do Cliente</h1>
                    <p>Bem-vindo, {user.firstName}!</p>
                    <StyledUl>
                        <li>
                            <NavLink to="/produtos">
                                <Button>Produtos</Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/categorias">
                                <Button>Categorias</Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/configuracoes">
                                <Button>Configurações</Button>
                            </NavLink>
                        </li>
                        <li>
                            <a href="" onClick={logout}>
                                <Button>Sair</Button>
                            </a>
                        </li>
                    </StyledUl>
                </Col>
            </Row>
        </Container>
    )
}

export default CostumerMenu;
