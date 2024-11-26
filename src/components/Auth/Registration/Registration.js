import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import '../../../styles/Auth.css'; 

const Registration = () => {
    return (
        <Container className="auth-block">
            <h1>Cadastre-se</h1>
            <Form>
                <Form.Control className='mb-3 form-control' type='text' placeholder="Nome Completo" />
                <Form.Control className='mb-3 form-control' type='number' placeholder="CPF" />
                <Form.Control className='mb-3 form-control' type='email' placeholder="E-mail" />
                <Form.Control className='mb-3 form-control' type='password' placeholder='Senha' />
                <Form.Control className='mb-3 form-control' type='password' placeholder='Confirmar Senha' />

                <Button type="submit">Cadastrar</Button>
            </Form>
        </Container>
    );
};

export default Registration;
