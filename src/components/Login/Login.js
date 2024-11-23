import React from 'react';
import { Button, Card, Col, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import './Login.css';

const Login = () => {
    return (
        <Container className="login-block" fluid>
            <h1>Olá Novamente!</h1>
            <Form className='mb-3'>
                <Form.Control className='mb-3' type='email' placeholder="E-mail" />
                <Form.Control className='mb-3' type='password' placeholder='Senha'/>
                
                <p id='login-problem'>
                    Não Consegue acessar?
                </p>

                <Button variant='primary' type='submit'>
                    Entrar
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
