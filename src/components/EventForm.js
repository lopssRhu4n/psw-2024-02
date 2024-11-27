import { Form, Row, Button, Col, Image } from "react-bootstrap";
import { useDispatch, } from "react-redux";
import { addNewEvent, updateEvent } from "../store/slices/EventSlice";
import placeHolderImg from "../assets/placeholder.jpeg";
import { useState } from "react";

export const EventForm = (props) => {
    const dispatch = useDispatch();

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

    const handleSubmit = (e) => {
        e.preventDefault();

        let requestData = { ...event };
        if (props.data) {
            dispatch(updateEvent(requestData))
        } else {
            requestData.used_capacity = 0
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
                <Form.Group as={Col} className="col-12 col-md-6 my-3 my-md-0" controlId="form-event-title">
                    <Form.Label>Nome do Evento</Form.Label>
                    <Form.Control name="title" value={event.title} onChange={handleChange} required placeholder="Digite o nome" />
                </Form.Group>
                <Form.Group as={Col} className="col-12 col-md-6" controlId="form-event-location">
                    <Form.Label>Local do Evento</Form.Label>
                    <Form.Control name="location" value={event.location} onChange={handleChange} required placeholder="Selecione o Local" />
                </Form.Group>
            </Row>

            <Row className="my-3 justify-content-between">
                <Row className="col-12 col-md-6 pe-md-0">
                    <Form.Group as={Col} className="pe-0" controlId="form-event-main_image">
                        <Form.Label className="w-100 mb-4"><Image height={250} className="w-100" rounded src={placeHolderImg} /></Form.Label>
                        <Form.Control name="img" type="file"

                        // value={event.img} onChange={handleChange} 
                        />
                        {/* <input type="file" /> */}
                    </Form.Group>
                </Row>

                <Row className="col-12 col-md-6 ps-md-0 justify-content-center">
                    <Form.Group as={Col} className="ps-md-0 col-12 d-flex flex-column justify-content-end  my-3 my-md-0" controlId="form-event-date">
                        <Form.Label>Selecione a data do evento</Form.Label>
                        <Form.Control name="date" required type="date" value={event.date} onChange={handleChange} />
                    </Form.Group>
                    <div className="row justify-content-between px-0">
                        <Form.Group as={Col} className="d-flex flex-column ps-0 justify-content-end" controlId="form-event-start_time">
                            <Form.Label >Início:</Form.Label>
                            <Form.Control className="" name="start_time" required type="time" placeholder="Início" value={event.start_time} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} className="d-flex flex-column justify-content-end pe-0" controlId="form-event-end_time">
                            <Form.Label>Final:</Form.Label>
                            <Form.Control className="" name="end_time" placeholder="Final" required type="time" value={event.end_time} onChange={handleChange} />
                        </Form.Group>
                    </div>
                </Row>

            </Row>
            <Row className="my-3">
                <Form.Group as={Col} controlId="form-event-capacity">
                    <Form.Label>Selecione a capacidade do evento:</Form.Label>
                    <Form.Control name="capacity" required type="number" value={event.capacity} onChange={handleChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="form-event-price">
                    <Form.Label>Selecione o preço do evento:</Form.Label>
                    <Form.Control name="price" required type="number" value={event.price} onChange={handleChange}></Form.Control>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="form-event-description">
                    <Form.Label>Descrição do evento:</Form.Label>
                    <Form.Control name="description" required as="textarea" value={event.description} onChange={handleChange} rows="3" />
                </Form.Group>
            </Row>

            <Button type="submit" className="mt-4">Criar evento</Button>
        </Form >

    );
}
