import { Form } from "react-bootstrap";

const DefaultInput = ({ field, register, placeholder, errors, className = '', type = 'text' }) => {

    const hasLabel = () => {
        if (type === 'time' || type === 'date') {
            return <Form.Label>{placeholder}</Form.Label>
        }
    }

    return (
        <Form.Group className={className} controlId={'form-' + field}>
            {hasLabel()}
            <Form.Control
                bsPrefix="my-form-control"
                className={(errors[field]?.message === undefined ? '' : 'error-input')}
                placeholder={placeholder}
                name={field}
                {...register(field)}
                type={type}
            />
            <span className="error-span">{errors[field]?.message}</span>
        </Form.Group>
    );

}

export default DefaultInput;