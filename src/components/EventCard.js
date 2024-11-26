import { Card, Row } from "react-bootstrap";
import PlaceholderImage from "../assets/placeholder.jpeg";
import { useNavigate } from "react-router-dom";

export const EventCard = (props) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/event/" + props.val.id);
    }
    return (
        <Card className="main-card h-100" onClick={handleClick}>
            <Card.Header className="p-0">
                <Card.Img src={props.val.img ?? PlaceholderImage} />
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.val.title}</Card.Title>
                <Card.Text className="mb-3">
                    {props.val.description}
                </Card.Text>
                <Row className="mb-4 mt-auto">
                    <Card.Text className="col-6 m-0 text-start d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill me-3"></i>
                        {props.val.location}
                    </Card.Text>
                    <Card.Text className="col-6 m-0 text-end d-flex align-items-center justify-content-end">
                        <i className="bi bi-coin me-3"></i>
                        {props.val.price}
                    </Card.Text>
                </Row>
                <Row>
                    <Card.Text className="col-6 m-0 text-start d-flex align-items-center">
                        <i className="bi bi-calendar-date-fill me-3"></i>
                        {props.val.date}
                    </Card.Text>
                    <Card.Text className="col-6 m-0 text-end d-flex align-items-center justify-content-end">
                        <i className="bi bi-people-fill me-3"></i>
                        {props.val.used_capacity + '/' + props.val.capacity}
                    </Card.Text>
                </Row>

            </Card.Body>
        </Card>

    );
}
