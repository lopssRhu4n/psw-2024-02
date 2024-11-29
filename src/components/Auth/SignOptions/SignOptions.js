import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../../styles/SignOptions.css";

const Sign = ({ onSwitch }) => {
    return (
        <Container className="sign-banner" fluid>
            <Col>
                <h1>Evente-se</h1>
                <Row>
                    <Col>
                        <Button
                            className="sign-options"
                            onClick={() => onSwitch("register")}
                        >
                            Cadastre-se
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            className="sign-options"
                            onClick={() => onSwitch("login")}
                        >
                            Entrar
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Container>
    );
};

export default Sign;
