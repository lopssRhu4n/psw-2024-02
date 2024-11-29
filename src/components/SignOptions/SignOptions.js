import React from 'react';
import { Button, Card, Col, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import './SignOptions.css';

const Sign = () => {
    return (
        <Container className="sign-banner" fluid>
            <Col>
                <h1>Evente-se</h1>
                <Row>
                    <Col>
                    <Button className='sign-options'>
                        Cadastre-se
                    </Button>
                    </Col>
                    <Col>

                    <Button className='sign-options'>
                        Entrar
                    </Button>
                    </Col>
                </Row> 
            </Col>
        </Container>
    );
};

export default Sign;
