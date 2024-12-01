import { Form } from "react-bootstrap";

const DefaultInput = ({ field, register, placeholder, errors }) => {
    return (
        <Form.Group controlId={'form-' + field}>
            <Form.Control bsPrefix="my-form-control" className={errors[field]?.message === undefined ? '' : 'error-input'} placeholder={placeholder} name={field} {...register(field)} />
            <span className="error-span">{errors[field]?.message}</span>
        </Form.Group>
    );

}

export default DefaultInput;