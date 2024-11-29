import { Button, Form, Row } from "react-bootstrap";

const LoginPage = () => {
    return (
        <Form className="px-4 py-2 mt-4 d-flex h-50 justify-content-between align-items-center  flex-column">
            <Row className="justify-content-center  h2">Bem-vindo novamente.</Row>

            <div style={{ minWidth: '280px' }} className="w-75">
                <Row className="my-4">
                    <Form.Group>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>

                <Row className="my-4">
                    <Form.Group>

                        <Form.Label>Email</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>

                <div className="my-4 d-flex justify-content-end">
                    <Button>Entrar</Button>
                </div>

            </div>
        </Form>
    );
}

export default LoginPage;