import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const PasswordInput = ({ field, register, placeholder, errors }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
        <Form.Group className="position-relative" controlId={'form-' + field}>
            <Form.Control bsPrefix="my-form-control" className={errors[field]?.message === undefined ? '' : 'error-input'} placeholder={placeholder} name={field} {...register(field)} type={isPasswordVisible ? 'text' : 'password'} />
            <Button bsPrefix="form-input-checkbox" className=" pa-0  border-0" onClick={() => setIsPasswordVisible(!isPasswordVisible)} >
                <i className={isPasswordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
            </Button>

            <span className="error-span">{errors[field]?.message}</span>

        </Form.Group>
    );
};

export default PasswordInput;