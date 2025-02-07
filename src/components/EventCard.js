import { Card, Row } from "react-bootstrap";
import PlaceholderImage from "../assets/placeholder.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvites, selectEventInvites, selectInvitesStatus } from "../store/slices/InviteSlice";
import { useEffect } from "react";

export const EventCard = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const invitesListStatus = useSelector(selectInvitesStatus);

    useEffect(() => {
        dispatch(fetchAllInvites());
    }, [dispatch, invitesListStatus]);

    const handleClick = () => {
        navigate("/event/" + props.val._id);
    }

    const userQuantity = useSelector((state) => selectEventInvites(state, props.val._id)).length;

    return (
        <Card className="main-card h-100" onClick={handleClick}>
            <Card.Header className="p-0">
                <Card.Img
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = PlaceholderImage;
                    }}
                    src={props.val.img ? 'http://localhost:3004' + props.val.img : PlaceholderImage}
                    style={{ width: 'full', height: '300px' }}
                />
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.val.title}</Card.Title>
                {/* <Card.Text className="mb-3">
                    {props.val.description}
                </Card.Text> */}
                <Row className="mb-4 mt-auto">
                    <Card.Text className="col-6 m-0 text-start d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill me-3"></i>
                        {props.val.location}
                    </Card.Text>
                    <Card.Text className="col-6 m-0 text-end d-flex align-items-center justify-content-end">
                        <i className="bi bi-coin me-3"></i>
                        R$ {props.val.price}
                    </Card.Text>
                </Row>
                <Row>
                    <Card.Text className="col-6 m-0 text-start d-flex align-items-center">
                        <i className="bi bi-calendar-date-fill me-3"></i>
                        {props.val.date.slice(0, 10)}
                    </Card.Text>
                    <Card.Text className="col-6 m-0 text-end d-flex align-items-center justify-content-end">
                        <i className="bi bi-people-fill me-3"></i>
                        {userQuantity + '/' + props.val.capacity}
                    </Card.Text>
                </Row>

            </Card.Body>
        </Card>

    );
}
