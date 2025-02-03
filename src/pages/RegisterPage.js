import { Form, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../store/slices/AuthSlice"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/RegisterSchema";
import DefaultInput from "../components/Form/DefaultInput";
import PasswordInput from "../components/Form/PasswordInput";

const RegisterPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const onSubmit = (data) => {
        // console.log(user)
        let requestData = new FormData();
        Object.keys(data).forEach((key) => {
            requestData.append(key, data[key]);
        })


        dispatch(registerNewUser(requestData));
        navigate('/');
    }

    return (

        <Form className="px-4 py-2 mt-4 d-flex justify-content-between align-items-center  flex-column" onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-center text-center w-100 h2">Vamos começar.</Row>
            <div style={{ minWidth: '280px' }} className="w-75">
                <Row className="my-3">
                    <DefaultInput placeholder={'Nome Completo'} register={register} field={'name'} errors={errors} />
                </Row>

                <Row className="my-3">
                    <DefaultInput placeholder={'CPF'} register={register} errors={errors} field={'cpf'} />
                </Row>

                <Row className="my-3">
                    <DefaultInput placeholder={'Email'} register={register} errors={errors} field={'email'} />
                </Row>

                <Row className="my-3">
                    <PasswordInput placeholder={'Senha'} register={register} errors={errors} field={'password'} />
                </Row>

                <Row className="my-3">
                    <PasswordInput placeholder={'Confirmar Senha'} register={register} errors={errors} field={'confirmPassword'} />
                </Row>

                <div className="my-3 d-flex justify-content-end">
                    <Button className="bg-primary border-white" type="submit">Entrar</Button>
                </div>

            </div>
        </Form>
    );
}

export default RegisterPage;