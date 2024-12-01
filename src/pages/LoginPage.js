import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { handleInput } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsersList, selectAuthError, selectIsAuthenticated, userLoggedIn } from "../store/slices/AuthSlice";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const error = useSelector(selectAuthError);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (!error && isAuthenticated) {
            navigate('/');
        } else if (error) {
            setCredentials({ email: '', password: '' });
        }
    },
        [error, isAuthenticated, navigate])


    dispatch(fetchUsersList());

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLoggedIn(credentials));
    }

    return (
        <Form onSubmit={handleSubmit} className="px-4 py-2 mt-4 d-flex h-50 justify-content-between align-items-center  flex-column">
            <Row className="justify-content-center  text-center w-100 h2">Bem-vindo novamente.</Row>

            <div style={{ minWidth: '280px' }} className="w-75">
                <Row className="my-4">
                    <Form.Group controlId="form-credentials-email">
                        <Form.Label></Form.Label>
                        <Form.Control bsPrefix="my-form-control" className="" placeholder="Email" required name="email" value={credentials.email} onChange={(e) => handleInput(e, setCredentials)} />
                    </Form.Group>
                </Row>

                <Row className="my-4">
                    <Form.Group controlId="form-credentials-password">
                        <Form.Label></Form.Label>
                        <Form.Control bsPrefix="my-form-control" className="" placeholder="Senha" required name="password" value={credentials.password} onChange={(e) => handleInput(e, setCredentials)} type="password" />
                    </Form.Group>
                </Row>

                {error}

                <div className="my-4 d-flex justify-content-end">
                    <Button className="bg-primary border-white" type="submit">Entrar</Button>
                </div>

            </div>
        </Form>
    );
}

export default LoginPage;