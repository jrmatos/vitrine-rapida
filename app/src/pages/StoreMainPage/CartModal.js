import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import {
    StyledCartModal,
    StyledCartItemsContainer,
    StyledWhatsappButtonContainer,
    StyledTotalContainer,
    StyledDeleteItemFromCartContainer,
    StyledAnotherFields
} from './style';

import { ReactComponent as DeleteIcon } from '../../assets/delete.svg'

function useOutsideAlerter(ref, closeModal) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeModal()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


function CartModal({ isOpen, cartItems, closeModal, deleteItem, whatsappNumber }) {
    const containerRef = useRef(null);
    const [text, setText] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Dinheiro");
    const [notes, setNotes] = useState("");

    useOutsideAlerter(containerRef, closeModal);


    function getDistinctItems() {
        const distinctItems = {};

        cartItems.forEach((item) => {
            if (!distinctItems[item._id]) {
                distinctItems[item._id] = {
                    ...item,
                    count: 1
                };
            } else {
                distinctItems[item._id].count++;
                distinctItems[item._id].price += item.price;
            }
        });

        return distinctItems;
    }

    function list() {
        
        const distinctItems = getDistinctItems();

        return Object.keys(distinctItems).map((key) => {
            const { _id, name, price, count } = distinctItems[key];

            return (
                <li key={key}>
                    <StyledDeleteItemFromCartContainer>
                        <button onClick={() => deleteItem(_id)}>
                            <DeleteIcon />
                        </button>
                        <span>{count}x {name}</span>
                    </StyledDeleteItemFromCartContainer>
                    <span>R$ {price.toFixed(2)}</span>
                </li>
            )
        });
    }

    function getTextFromList() {
        const distinctItems = getDistinctItems();


        const arr = Object.keys(distinctItems).map((key) => {
            const { _id, name, price, count } = distinctItems[key];
            return `${count}x ${name} R$ ${price.toFixed(2)}`;
        });

        return arr.join('\n');
    }

    function calculateTotal() {
        const total = cartItems.reduce((prev, curr) => {
            return prev + curr.price;
        }, 0);

        return total.toFixed(2);
    }

    function generateWhatsappLink() {
        return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;
    }

    useEffect(() => {
        const items = getTextFromList();
        const total = calculateTotal();

        let str = `*GOSTARIA DE FAZER UM PEDIDO*\n\n${items}\n\nTotal R$ ${total}`;

        // TODO: feature disabled. Must be handled by the costumer.
        // str = `${str}\n\nForma de pagamento: ${paymentMethod}`;

        if (address) {
            str = `${str}\n\nEndereço: ${address}`
        }

        if (notes) {
            str = `${str}\n\nObservação: ${notes}`
        }

        setText(encodeURIComponent(str))
    }, [cartItems, paymentMethod, address, notes]);

    return (
        <StyledCartModal
            isOpen={isOpen}
            hasItems={cartItems.length}
            ref={containerRef}
        >
            <h1>Carrinho</h1>
            <StyledCartItemsContainer>
                {list()}
                <StyledTotalContainer>
                    <span>Total</span>
                    <span>R$ {calculateTotal()}</span>
                </StyledTotalContainer>
                <StyledWhatsappButtonContainer href={generateWhatsappLink()}>
                    <button>Enviar pedido</button>
                </StyledWhatsappButtonContainer>
                <StyledAnotherFields>
                    {/* TODO: feature disabled. Must be handled by the costumer.
                    <Form.Group controlId="endereço">
                        <Form.Control
                            as="select"
                            
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="Dinheiro">Quero pagar com Dinheiro</option>
                            <option value="Cartão de Débito">Quero pagar com Cartão de Débito</option>                                       
                            <option value="Cartão de Crédito">Quero pagar com Cartão de Crédito</option>                                       
                            <option value="Outra">Quero pagar de outra forma</option>                                       
                        </Form.Control>
                    </Form.Group> */}
                    <Form.Group controlId="endereço">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Endereço (opcional)"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="endereço">
                        <Form.Control
                            required
                            as="textarea" rows="3"
                            placeholder="Observação (opcional)"
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Form.Group>
                </StyledAnotherFields>
            </StyledCartItemsContainer>
        </StyledCartModal>
    )
}

export default CartModal;
