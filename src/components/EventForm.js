import { Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector, } from "react-redux";
import { addNewEvent, updateEvent } from "../store/slices/EventSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "../validation/EventSchema";
import { selectCurrentUser } from "../store/slices/AuthSlice";
import DefaultInput from "./Form/DefaultInput";
import ImageInput from "./Form/ImageInput";

export const EventForm = (props) => {
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(eventSchema)
    })

    const currentUser = useSelector(selectCurrentUser);

    const [event, setEvent] = useState(props.data ?? {
        title: '',
        description: '',
        location: '',
        price: '',
        date: '',
        start_time: '',
        end_time: '',
        capacity: '',
        used_capacity: '',
        img: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEvent((previousEvent) => ({ ...previousEvent, [name]: value }));
    }

    const onSubmit = (data) => {
        let requestData = { ...event };
        if (props.data) {
            dispatch(updateEvent(requestData))
        } else {
            requestData.used_capacity = 0
            requestData.user_id = currentUser.id;
            dispatch(addNewEvent(requestData));
        }
        props.setShowForm(false);


    }
    return (

        <Form className="border rounded-1 position-fixed z-3  w-75 h-75 bg-body py-4 px-3 overflow-x-hidden  overflow-y-scroll" style={{}} onSubmit={handleSubmit}  >
            <Row className="d-flex my-3 px-2 justify-content-between">
                <div style={{ width: 'auto' }} className="h2">Criar Evento</div>
                <Button className="rounded-circle bg-body border-0" style={{ width: 'auto' }} onClick={() => props.setShowForm(false)}>
                    <i className="bi bi-x-lg" width="32" height="32"></i>
                    {props.showForm}
                </Button>
            </Row>

            <Row className="my-3">
                {/* <Form.Group as={Col} className="col-12 col-md-6 my-3 my-md-0" controlId="form-event-title">
                    <Form.Label>Nome do Evento</Form.Label>
                    <Form.Control name="title" value={event.title} onChange={handleChange} required placeholder="Digite o nome" />
                </Form.Group> */}
                <DefaultInput className="col-12 col-md-6" field={'title'} register={register} placeholder={'Digite o nome do evento'} errors={errors} />
                <DefaultInput className="col-12 col-md-6" field={'location'} register={register} placeholder={'Local do Evento'} errors={errors} />
                {/* <Form.Group as={Col} className="col-12 col-md-6" controlId="form-event-location">
                    <Form.Label>Local do Evento</Form.Label>
                    <Form.Control name="location" value={event.location} onChange={handleChange} required placeholder="Selecione o Local" />
                </Form.Group> */}
            </Row>

            <Row className="my-3 justify-content-between">
                <Row className="col-12 col-md-6 pe-md-0">
                    {/* <Form.Group as={Col} className="pe-0" controlId="form-event-main_image">
                        <Form.Label className="w-100 mb-4"><Image height={250} className="w-100" rounded src={placeHolderImg} /></Form.Label>
                        <Form.Control name="img" type="file" */}

                    {/* /> */}
                    {/* <input type="file" /> */}
                    {/* </Form.Group> */}
                    <ImageInput register={register} field={'img'} errors={errors} placeholder={'Imagem'} />
                </Row>

                <Row className="col-12 col-md-6 ps-md-0 justify-content-center">
                    {/* <Form.Group as={Col} className="ps-md-0 col-12 d-flex flex-column justify-content-end  my-3 my-md-0" controlId="form-event-date">
                        <Form.Label>Selecione a data do evento</Form.Label>
                        <Form.Control name="date" required type="date" value={event.date} onChange={handleChange} />
                    </Form.Group> */}
                    <DefaultInput
                        className="col-12  ps-md-0 d-flex flex-column justify-content-end"
                        placeholder={'Data do evento:'}
                        field={'date'}
                        register={register}
                        errors={errors}
                        type="date"
                    />
                    <div className="row justify-content-between px-0">
                        <DefaultInput className="col d-flex flex-column ps-0 justify-content-end" placeholder={'Início:'} register={register} errors={errors} field={'start_time'} type="time" />
                        <DefaultInput className="col d-flex flex-column ps-0 justify-content-end" placeholder={'Fim:'} register={register} errors={errors} field={'end_time'} type="time" />
                    </div>
                </Row>

            </Row>
            <Row className="my-3">
                <DefaultInput className="col" placeholder={'Capacidade'} field={'capacity'} register={register} errors={errors} type="number" />
                <DefaultInput className="col" placeholder={'Preço do evento'} field={'price'} register={register} errors={errors} type="number" />
            </Row>

            <Row>
                {/* <DefaultInput register={register} placeholder={'Descrição do evento'} field={'description'} errors={errors} type=""/> */}
                <Form.Group controlId="form-event-description">
                    <Form.Label>Descrição do evento:</Form.Label>
                    <Form.Control name="description" required as="textarea" value={event.description} onChange={handleChange} rows="3" />
                </Form.Group>
            </Row>

            <Button type="submit" className="mt-4">Criar evento</Button>
        </Form >

    );
}
