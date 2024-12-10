import { useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsersList, selectAuthError, selectIsAuthenticated, userLoggedIn } from "../store/slices/AuthSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/LoginSchema";
import DefaultInput from "../components/Form/DefaultInput";
import PasswordInput from "../components/Form/PasswordInput";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });


    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [credentials, setCredentials] = useState({ email: '', password: '' })
    const error = useSelector(selectAuthError);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (!error && isAuthenticated) {
            navigate('/');
        }
    },
        [error, isAuthenticated, navigate])


    dispatch(fetchUsersList());

    const onSubmit = (data) => {
        dispatch(userLoggedIn(data));
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="px-4 py-2 mt-4 d-flex h-50 justify-content-between align-items-center  flex-column">
            <Row className="justify-content-center  text-center w-100 h2">Bem-vindo novamente.</Row>

            <div style={{ minWidth: '280px' }} className="w-75">
                <Row className="my-4">
                    <DefaultInput field={'email'} register={register} placeholder={'Email'} errors={errors} />
                </Row>

                <Row className="my-4">
                    <PasswordInput field={'password'} register={register} placeholder={'Senha'} errors={errors} />
                </Row>

                <span className="error-span text-center">{error}</span>

                <div className="my-4 d-flex justify-content-end">
                    <Button className="bg-primary rounded-3" type="submit" style={{
                        border: 'none',
                        fontSize: '2rem',
                        width: '100%'
                    }}>Entrar</Button>
                </div>

            </div>
        </Form >
    );
}

export default LoginPage;