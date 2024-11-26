import { Button, Card, Container, ListGroup, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlaceholderImage from "../assets/placeholder.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventList, selectEventById } from "../store/slices/EventSlice";
import '../styles/EventPage.css'
import { useState } from "react";
import { EventForm } from "../components/EventForm";

const EventPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showFormUpdate, setShowFormUpdate] = useState(false);

    const handleNavigate = () => {
        navigate('/user/1');
    }

    dispatch(fetchEventList());


    const isUserEvent = true;

    const event = useSelector((state) => selectEventById(state, id));


    return <Container fluid="md" >
        {showFormUpdate ? <EventForm setShowForm={setShowFormUpdate} showForm={showFormUpdate} data={event} /> : ''}
        <Card className="" style={{ height: '75vh' }}>
            <Card.Img
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = PlaceholderImage;
                }}
                variant="top"
                src={event?.img ? event?.img : PlaceholderImage}
                height={300}
            />
            <Card.ImgOverlay className="text-dark flex" style={{ maxHeight: '350px' }}>
                <Image
                    src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
                    className="icon-overlay bg-primary cursor-pointer  border border-white p-2 rounded-circle position-absolute z-3" rounded fluid
                    onClick={handleNavigate}
                />

                <Card.Title className="bg-dark text-white">{event?.title}</Card.Title>
                <Card.Text className="bg-dark text-white">
                    {event?.date} | {event?.start_time} - {event?.end_time}
                </Card.Text>
            </Card.ImgOverlay>
            {/* <ListGroup className="list-group-flush"> */}
            {/* <ListGroup.Item className="mt-2">{event?.description}</ListGroup.Item> */}
            {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup> */}
            <Card.Body className="h-100 d-flex flex-column justify-content-between">

                <Card.Text className="mt-2">{event?.description}</Card.Text>
                <div>
                    {isUserEvent ? (<Button onClick={() => setShowFormUpdate(true)}>Editar</Button>) : (<Button>Participar</Button>)}
                </div>
            </Card.Body>
        </Card>
    </Container  >


}

export default EventPage;
