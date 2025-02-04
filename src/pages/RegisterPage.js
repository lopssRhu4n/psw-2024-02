import { Form, Row, Button, Image } from "react-bootstrap";
import "../styles/RegisterPage.css"
import placeHolderImg from "../assets/placeholder.jpeg";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../store/slices/AuthSlice"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/RegisterSchema";
import DefaultInput from "../components/Form/DefaultInput";
import PasswordInput from "../components/Form/PasswordInput";
import { useRef, useState } from "react";

const RegisterPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const [imagePreview, setImagePreview] = useState(null);
    const imageFile = watch('img')
    const inputSrc = imagePreview ? imagePreview : imageFile ? 'http://localhost:3004' + imageFile : placeHolderImg;



    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // const uniqueFileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-eventimg`;


        if (file) {
            // setValue("image", file); // Atualiza o valor do input no useForm
            setValue('img', file)

            // Criar uma URL temporária para exibir a imagem
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



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
                <Row className="">
                    <Form.Group className="d-flex flex-column">
                        <Form.Label onClick={() => fileInputRef.current.click()} for="img" className="d-flex justify-content-center">
                            <Image height={100} width={100} className="img-input rounded-circle object-fit-cover border border-light-subtle" src={inputSrc} />
                        </Form.Label>
                        <Form.Control
                            bsPrefix="my-form-control"
                            className="d-none"
                            type="file" // className={(errors[field]?.message === undefined ? '' : 'error-input')}
                            // placeholder={ }
                            ref={fileInputRef}
                            accept=".png,.jpg,.jpeg"
                            name="img"

                            onChange={handleImageChange}
                        // onChange={handleImageChange}
                        />

                        <span className="error-span text-center">{errors['img']?.message}</span>
                    </Form.Group>

                </Row>
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