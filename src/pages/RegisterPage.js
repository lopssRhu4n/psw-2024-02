import { useState } from "react";
import { handleInput } from "../utils/utils";
import { Form, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../store/slices/AuthSlice"

const RegisterPage = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(user)
        const { confirmPassword, ...data } = user;
        console.log(confirmPassword, data)
        console.log(confirmPassword === data.password)
        if (data.password === confirmPassword) {
            dispatch(registerNewUser(data));
        }
    }

    return (

        <Form className="px-4 py-2 mt-4 d-flex justify-content-between align-items-center  flex-column" onSubmit={handleSubmit}>
            <Row className="justify-content-center  h2">Vamos começar.</Row>
            <div style={{ minWidth: '280px' }} className="w-75">
                <Row className="my-3">
                    <Form.Group controlId="form-user-name">
                        <Form.Label>Nome Completo</Form.Label>
                        <Form.Control name="name" value={user.name} onChange={(e) => handleInput(e, setUser)} />
                    </Form.Group>
                </Row>

                <Row className="my-3">
                    <Form.Group controlId="form-user-cpf">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control name="cpf" value={user.cpf} onChange={(e) => handleInput(e, setUser)} />
                    </Form.Group>
                </Row>


                <Row className="my-3">
                    <Form.Group controlId="form-user-email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={user.email} onChange={(e) => handleInput(e, setUser)} />
                    </Form.Group>
                </Row>

                <Row className="my-3">
                    <Form.Group controlId="form-user-password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" name="password" value={user.password} onChange={(e) => handleInput(e, setUser)} />
                    </Form.Group>
                </Row>

                <Row className="my-3">
                    <Form.Group controlId="form-user-confirm-password">
                        <Form.Label>Confirmar Senha</Form.Label>
                        <Form.Control type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e) => handleInput(e, setUser)} />
                    </Form.Group>
                </Row>



                <div className="my-3 d-flex justify-content-end">
                    <Button type="submit">Entrar</Button>
                </div>

            </div>
        </Form>
    );
}

export default RegisterPage;