import { Button, Card, Col, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useState } from "react";
import { defaultEventList } from "../models/Event";
import '../styles/MainPage.css'

const MainPage = () => {
    const [eventList] = useState(defaultEventList);
    const [showCreationForm, setShowCreationForm] = useState(false);
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Criar Evento
        </Tooltip>
    );

    return (<div fluid="sm" className="mx-auto  main-container pt-5 mb-5  gx-4 gy-5 row justify-content-center" style={{ width: '90%' }} >
        <h1 className="col-12"> Eventos</h1>
        {
            eventList.map((val, index) =>
                <div className="main-card-container col-sm-6 col-lg-4" style={{ minWidth: '350px' }} key={'event-card-' + index}>
                    <Card className="main-card " >
                        <Card.Header className="p-0">
                            <Card.Img src="https://static.todamateria.com.br/upload/ab/ob/aboboras2-cke.jpg" />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{val.title}</Card.Title>
                            <Card.Text className="mb-3">{val.description}</Card.Text>
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
            <Form className="border  rounded-1 position-fixed w-75 h-75 bg-body py-4 px-3" style={{}}  >
                <Row className="d-flex px-2 justify-content-between">
                    <div style={{ width: 'auto' }}>Criar Evento</div>
                    <Button className="rounded-circle bg-body border-0" style={{ width: 'auto' }} onClick={() => setShowCreationForm(false)}>
                        <i className="bi bi-x-lg" width="32" height="32"></i>
                        {showCreationForm}
                    </Button>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="formGridEventName">
                        <Form.Label>Nome do Evento</Form.Label>
                        <Form.Control placeholder="Digite o nome" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEventLocation">
                        <Form.Label>Local do Evento</Form.Label>
                        <Form.Control placeholder="Selecione o Local" />
                    </Form.Group>
                </Row>

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