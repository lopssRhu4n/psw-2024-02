import { Card, Row } from "react-bootstrap";
import { useState } from "react";
import { defaultEventList } from "../models/Event";
import '../styles/MainPage.css'

const MainPage = () => {
    const [eventList] = useState(defaultEventList);

    return (<div fluid="sm" className="mx-auto main-container pt-5 mb-5  gx-4 gy-5 row justify-content-center" style={{ width: '90%' }} >
        <h1 className="col-12"> Eventos</h1>
        {
            eventList.map((val, index) =>
                <div className="col-sm-6 col-lg-4" style={{ minWidth: '350px' }} key={'event-card-' + index}>
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
    </div >);
}

export default MainPage;