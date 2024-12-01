import { Col, Form, Image } from "react-bootstrap";
import placeHolderImg from "../../assets/placeholder.jpeg";


const ImageInput = ({ field, register, placeholder, errors, className = '' }) => {
    return (
        <Form.Group as={Col} className="pe-0" controlId="form-event-main_image">
            <Form.Label className="w-100 mb-4"><Image height={250} className="w-100" rounded src={placeHolderImg} /></Form.Label>
            <Form.Control
                bsPrefix="my-form-control"
                type="file"
                className={(errors[field]?.message === undefined ? '' : 'error-input')}
                placeholder={placeholder}
                name={field}
                {...register(field)}
            />
            <span className="error-span">{errors[field]?.message}</span>
        </Form.Group>

    );
}

export default ImageInput;