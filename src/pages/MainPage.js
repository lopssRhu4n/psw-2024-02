import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import '../styles/MainPage.css'
import { useDispatch, useSelector } from "react-redux";
import { addNewEvent, fetchEventList, selectEventList, selectEventsStatus } from "../store/slices/EventSlice";

const MainPage = () => {
    const eventList = useSelector(state => selectEventList(state));
    const dispatch = useDispatch();
    const eventListFetchingStatus = useSelector(state => selectEventsStatus(state));

    useEffect(() => {
        dispatch(fetchEventList());
    }, [eventListFetchingStatus, dispatch]);


    const [showCreationForm, setShowCreationForm] = useState(false);
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Criar Evento
        </Tooltip>
    );

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

    return (<div fluid="sm" className="mx-auto  main-container pt-5 mb-5  gx-4 gy-5 row justify-content-center" style={{ width: '90%' }} >
        <h1 className="col-12"> Eventos </h1>
        {
            eventList.map((val, index) =>
                <div className="main-card-container col-sm-6 col-lg-4" style={{ minWidth: '350px' }} key={'event-card-' + index}>
                    <Card className="main-card h-100" >
                        <Card.Header className="p-0">
                            <Card.Img src="https://static.todamateria.com.br/upload/ab/ob/aboboras2-cke.jpg" />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{val.title}</Card.Title>
                            <Card.Text className="mb-3">
                                {val.description}
                            </Card.Text>
                            <Row className="mb-4">
                                <Card.Text className="col-6 m-0 text-start d-flex align-items-center">
                                    <i className="bi bi-geo-alt-fill me-3"></i>
                                    {val.location}
                                </Card.Text>
                                <Card.Text className="col-6 m-0 text-end d-flex align-items-center justify-content-end">
                                    <i className="bi bi-coin me-3"></i>
                                    {val.price}
                                </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text className="col-6 m-0 text-start d-flex align-items-center">
                                    <i className="bi bi-calendar-date-fill me-3"></i>
                                    {val.date}
                                </Card.Text>
                                <Card.Text className="col-6 m-0 text-end d-flex align-items-center justify-content-end">
                                    <i className="bi bi-people-fill me-3"></i>
                                    {val.used_capacity + '/' + val.capacity}
                                </Card.Text>
                            </Row>

                        </Card.Body>
                    </Card>
                </div>)
        }

        {showCreationForm ? (
            <Form className="border rounded-1 position-fixed w-75 h-75 bg-body py-4 px-3 overflow-y-scroll" style={{}} onSubmit={handleSubmit}  >
                <Row className="d-flex my-3 px-2 justify-content-between">
                    <div style={{ width: 'auto' }}>Criar Evento</div>
                    <Button className="rounded-circle bg-body border-0" style={{ width: 'auto' }} onClick={() => setShowCreationForm(false)}>
                        <i className="bi bi-x-lg" width="32" height="32"></i>
                        {showCreationForm}
                    </Button>
                </Row>

                <Row className="my-3">
                    <Form.Group as={Col} controlId="form-event-title">
                        <Form.Label>Nome do Evento</Form.Label>
                        <Form.Control required placeholder="Digite o nome" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="form-event-location">
                        <Form.Label>Local do Evento</Form.Label>
                        <Form.Control required placeholder="Selecione o Local" />
                    </Form.Group>
                </Row>

                <Row className="my-3">
                    <Form.Group as={Col} controlId="form-event-main_image">
                        <Form.Label>Insira a imagem do Evento</Form.Label>
                        <Form.Control required type="file" />
                    </Form.Group>
                </Row>
                <Row className="my-3">
                    <Form.Group as={Col} controlId="form-event-date">
                        <Form.Label>Selecione a data do evento</Form.Label>
                        <Form.Control required type="date" />
                    </Form.Group>
                    <div className="d-flex col">
                        <Form.Group as={Col} controlId="form-event-start_time">
                            <Form.Label>Início:</Form.Label>
                            <Form.Control className="me-1" required type="time" placeholder="Início" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="form-event-end_time">
                            <Form.Label>Final:</Form.Label>
                            <Form.Control className="ms-1" placeholder="Final" required type="time" />
                        </Form.Group>
                    </div>
                </Row>

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
            </Form>
        ) : (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
            >
                <Button className="bg-primary position-fixed z-3 rounded-circle" onClick={() => setShowCreationForm(true)} style={{ width: '75px', height: '75px', right: '3%', bottom: '6.5rem' }}>
                    <i className="bi bi-plus" width="32" height="32"></i>
                    {showCreationForm}
                </Button>
            </OverlayTrigger>

        )
        }
    </div >);
}

export default MainPage;