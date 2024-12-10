import { Card, Row } from "react-bootstrap";
import PlaceholderImage from "../assets/placeholder.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvites, selectEventInvites } from "../store/slices/InviteSlice";
import '../styles/components/EventCard.css';

export const EventCard = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    dispatch(fetchAllInvites());

    const handleClick = () => {
        navigate("/event/" + props.val.id);
    }

    const userQuantity = useSelector((state) => selectEventInvites(state, props.val.id)).length;

    return (
        <Card className="main-card h-100" onClick={handleClick}>
            <Card.Header className="p-0 m-0">
                <Card.Img className="card-img"

                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = PlaceholderImage;
                    }}
                    src={props.val.img ?? PlaceholderImage}
                />
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.val.title}</Card.Title>
                {/* <Card.Text className="mb-3">
                    {props.val.description}
                </Card.Text> */}
                <Row className="mb-4 mt-auto">
                    <Card.Text className="col-6 m-0 text-start d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill me-1 event-card-icon"></i>
                        {props.val.location}
                    </Card.Text>
                    <Card.Text className="col-6 m-0 text-end d-flex align-items-center justify-content-end">
                        <i className="bi bi-coin me-1 event-card-icon"></i>
                        R$ {props.val.price}
                    </Card.Text>
                </Row>
                <Row>
                    <Card.Text className="col-6 m-0 text-start d-flex align-items-center">
                        <i className="bi bi-calendar-date-fill me-1 event-card-icon"></i>
                        {props.val.date.slice(0, 10)}
                    </Card.Text>
                    <Card.Text className="col-6 m-0 text-end d-flex align-items-center justify-content-end">
                        <i className="bi bi-people-fill me-1 event-card-icon"></i>
                        {userQuantity + '/' + props.val.capacity}
                    </Card.Text>
                </Row>

            </Card.Body>
        </Card>

    );
}
