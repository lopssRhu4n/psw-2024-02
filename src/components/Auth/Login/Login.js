import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import '../../../styles/Auth.css'; 

const Login = () => {
    return (
        <Container className="auth-block">
            <h1>Olá novamente!</h1>
            <Form>
                <Form.Control className='mb-3 form-control' type='email' placeholder="E-mail" />
                <Form.Control className='mb-3 form-control' type='password' placeholder='Senha' />
                
                <p id='login-problem'>Não consegue acessar?</p>

                <Button type="submit">ENTRAR</Button>
            </Form>
        </Container>
    );
};

export default Login;
