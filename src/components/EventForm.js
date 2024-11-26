import { Form, Row, Button, Col, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNewEvent } from "../store/slices/EventSlice";
import placeHolderImg from "../assets/placeholder.jpeg";

export const EventForm = (props) => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        //  para selecionar apenas os elementos de dados do formulario
        let inputArrays = Array.from(e.currentTarget.elements).filter((el) => el.type !== "button" && el.type !== "submit");

        // para formatar os dados no formato de um evento utilizando os ids dos campos
        const newEventData = inputArrays.reduce((acc, val) => {
            var obj = { ...acc };
            obj[val.id.replace('form-event-', '')] = val.value;
            return obj;
        }, {})

        dispatch(addNewEvent(newEventData));
    }
    return (

        <Form className="border rounded-1 position-fixed  w-75 h-75 bg-body py-4 px-3 overflow-y-scroll" style={{}} onSubmit={handleSubmit}  >
            <Row className="d-flex my-3 px-2 justify-content-between">
                <div style={{ width: 'auto' }}>Criar Evento</div>
                <Button className="rounded-circle bg-body border-0" style={{ width: 'auto' }} onClick={() => props.setShowCreationForm(false)}>
                    <i className="bi bi-x-lg" width="32" height="32"></i>
                    {props.showCreationForm}
                </Button>
            </Row>

            <Row className="my-3">
                <Form.Group as={Col} className="col-12 col-md-6 my-3 my-md-0" controlId="form-event-title">
                    <Form.Label>Nome do Evento</Form.Label>
                    <Form.Control required placeholder="Digite o nome" />
                </Form.Group>
                <Form.Group as={Col} className="col-12 col-md-6" controlId="form-event-location">
                    <Form.Label>Local do Evento</Form.Label>
                    <Form.Control required placeholder="Selecione o Local" />
                </Form.Group>
            </Row>

            <Row className="my-3">
                <Row className="col-12 col-md-6">
                    <Form.Group as={Col} controlId="form-event-main_image">
                        <Form.Label className="w-100"><Image height={250} className="w-100" src={placeHolderImg} /></Form.Label>
                        <Form.Control type="file" />
                        {/* <input type="file" /> */}
                    </Form.Group>
                </Row>

                <Row className="col-12 col-md-6">
                    <Form.Group as={Col} className="col-12 d-flex flex-column justify-content-end  my-3 my-md-0" controlId="form-event-date">
                        <Form.Label>Selecione a data do evento</Form.Label>
                        <Form.Control required type="date" />
                    </Form.Group>
                    <div className="row justify-content-between">
                        <Form.Group as={Col} className="d-flex flex-column justify-content-end" controlId="form-event-start_time">
                            <Form.Label >Início:</Form.Label>
                            <Form.Control className="" required type="time" placeholder="Início" />
                        </Form.Group>
                        <Form.Group as={Col} className="d-flex flex-column justify-content-end" controlId="form-event-end_time">
                            <Form.Label>Final:</Form.Label>
                            <Form.Control className="" placeholder="Final" required type="time" />
                        </Form.Group>
                    </div>
                </Row>

            </Row>
            {/* <Row className="my-3">
                <Form.Group as={Col} className="col-12 col-md-6 my-3 my-md-0" controlId="form-event-date">
                    <Form.Label>Selecione a data do evento</Form.Label>
                    <Form.Control required type="date" />
                </Form.Group>
                <div className="row col-12 col-md-6">
                    <Form.Group as={Col} controlId="form-event-start_time">
                        <Form.Label >Início:</Form.Label>
                        <Form.Control className="" required type="time" placeholder="Início" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="form-event-end_time">
                        <Form.Label>Final:</Form.Label>
                        <Form.Control className="" placeholder="Final" required type="time" />
                    </Form.Group>
                </div>
            </Row> */}

            <Row className="my-3">
                <Form.Group as={Col} controlId="form-event-capacity">
                    <Form.Label>Selecione a capacidade do evento:</Form.Label>
                    <Form.Control required type="number"></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="form-event-price">
                    <Form.Label>Selecione o preço do evento:</Form.Label>
                    <Form.Control required type="number"></Form.Control>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="form-event-description">
                    <Form.Label>Descrição do evento:</Form.Label>
                    <Form.Control required as="textarea" rows="3" />
                </Form.Group>
            </Row>

            <Button type="submit" className="mt-4">Criar evento</Button>
        </Form >

    );
}
