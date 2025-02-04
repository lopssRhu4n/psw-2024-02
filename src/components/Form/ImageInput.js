import { Col, Form, Image } from "react-bootstrap";
import placeHolderImg from "../../assets/placeholder.jpeg";
import { useState } from "react";


const ImageInput = ({ field, watch, register, setValue, placeholder, errors, className = '' }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const imageFile = watch(field)
    const inputSrc = imagePreview ? imagePreview : imageFile ? 'http://localhost:3004' + imageFile : placeHolderImg;
    // console.log(imageFile)
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // const uniqueFileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-eventimg`;


        if (file) {
            // setValue("image", file); // Atualiza o valor do input no useForm
            setValue(field, file)

            // Criar uma URL temporária para exibir a imagem
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <Form.Group as={Col} className="pe-0" controlId="form-event-main_image">
            <Form.Label className="w-100 mb-4">
                <Image height={250} className="w-100" rounded src={inputSrc} />
            </Form.Label>
            <Form.Control
                bsPrefix="my-form-control"
                type="file"
                className={(errors[field]?.message === undefined ? '' : 'error-input') + ' object-cover-fit'}
                placeholder={placeholder}
                name={field}
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange}
            />
            <span className="error-span">{errors[field]?.message}</span>
        </Form.Group>

    );
}

export default ImageInput;