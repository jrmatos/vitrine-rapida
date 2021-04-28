import React, { useEffect } from 'react';
import YouTube from 'react-youtube';

import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { StyledSectionContainer, StyledTitle, StyledLinks } from './style';

const LandingPage = () => {
    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        const el = document.querySelector('body');
        el.classList.remove('store-page');
        el.classList.add('landing-page');
    }, []);
    
    return (
        <Row align="center" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Col>
                <StyledTitle>Vitrine Rápida</StyledTitle>
                <p>A solução ideal para alavancar vendas através do Whatsapp.</p>
                <StyledLinks>
                    <NavLink to="/entrar" className="landingpage-link">
                        Entrar
                    </NavLink>

                    <NavLink to="/criar-conta" className="landingpage-link">
                        Criar Conta
                    </NavLink>
                    <NavLink to="/lancheamazonas" className="landingpage-link">
                        Ver Exemplo
                    </NavLink>
                </StyledLinks>
                <StyledSectionContainer>
                    <h3>Veja nosso vídeo 👇</h3>
                    <YouTube videoId="SrLrh_-98hk" opts={opts} />
                </StyledSectionContainer>
                <StyledSectionContainer>
                    <h3>Quem somos 🙋‍♂️ 🙋‍♀️</h3>
                    <p>
                        A Vitrine Rápida é um projeto que nasceu em Setembro de 2020
                        com o intuito de ser uma ferramenta para que pequenos e
                        médios vendedores possam alavancar suas vendas através da Internet.
                    </p>
                    <p>
                        A ideia surgiu pela percepção do crescimento de vendas através de
                        plataformas sociais, como o Instagram e o Whatsapp. Embora ambas sejam
                        ferramentas por si só capazes de promover vendas, o vendedor precisa
                        de muito esforço na hora de realizar um atendimento individual ou
                        acessar dados do seu histórico de vendas.
                    </p>
                    <p>
                        O objetivo do nosso projeto é desenvolver funcionalidades que possam impulsionar
                        tanto a venda quanto a retenção de clientes, tornando o negócio cada vez mais forte.
                    </p>
                    <p>
                        Atualmente estamos em nossa versão MVP (do Inglês <i>Minimum Viable Product</i>).
                        Isso significa que apenas o mínimo de funcionalidades necessárias para
                        o funcionamento de uma ferramenta de vitrine virtual foi implementado.
                    </p>
                    <p>Pretendemos, com certeza, ir muito além. Em breve lançaremos novidades. 😉</p>
                </StyledSectionContainer>

                <StyledSectionContainer>
                    <h3>Quanto Custa 💰</h3>
                    <p>
                        Como estamos em fase Beta, novos clientes possuem um período de <b>30 dias para experimentar</b> nossa ferramenta de
                        forma gratuita. Após esse período, deverá ser feita uma assinatura mensal através da plataforma
                        de pagamentos recorrentes do PagSeguro (<a href="https://pagseguro.uol.com.br/para-seu-negocio/online/pagamento-recorrente">https://pagseguro.uol.com.br/para-seu-negocio/online/pagamento-recorrente</a>) via cartão de crédito 💳.
                    </p>
                    <p>
                        Atualmente estamos apenas com uma modalidade de plano, o <b>plano padrão</b>:
                    </p>
                    <ul>
                        <li>
                            Página no endereço <b>vitrinerapida.site/suaempresa</b> 24 horas por dia ✔
                        </li>
                        <li>
                            60 produtos ✔
                        </li>
                        <li>
                            60 categorias ✔
                        </li>
                        <li>
                            Carrinho ✔
                        </li>
                        <li>
                            Envio de pedido via Whatsapp ✔
                        </li>
                        <li>
                            Pedidos ilimitados ✔
                        </li>
                        <li>
                            Suporte via Whatsapp ✔
                        </li>
                    </ul>
                    <p>
                        Tudo isso por apenas <b>R$ 15,00</b> por mês! 😀
                    </p>
                </StyledSectionContainer>

                <StyledSectionContainer style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0 }}>
                        Copyright © 2020 - Vitrine Rápida, Instagram: <a href="https://www.instagram.com/vitrinerapida">@vitrinerapida</a>
                    </p>
                </StyledSectionContainer>
            </Col>
        </Row>
    )
}

export default LandingPage;
