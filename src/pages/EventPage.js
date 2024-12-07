import { Button, Card, Container, Dropdown, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlaceholderImage from "../assets/placeholder.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchEventList, selectEventById } from "../store/slices/EventSlice";
import '../styles/EventPage.css'
import { useEffect, useState } from "react";
import { EventForm } from "../components/EventForm";
import { fetchUsersList, selectAllUsers, selectCurrentUser, selectIsAuthenticated } from "../store/slices/AuthSlice";
import InviteForm from "../components/InviteForm";
import { deleteInvite, fetchEventInvites, selectEventInvites, selectInvitesStatus } from "../store/slices/InviteSlice";

const EventPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const eventInvites = useSelector(selectEventInvites);
    const userList = useSelector(selectAllUsers)
    const inviteStatus = useSelector(selectInvitesStatus);
    // const event
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [invite, setInvite] = useState({});
    // const [showFormUpdateInvite]

    dispatch(fetchEventList());

    useEffect(() => {
        dispatch(fetchEventInvites(id));
    }, [dispatch, id, inviteStatus])
    dispatch(fetchUsersList());


    const currentUser = useSelector(selectCurrentUser);
    const event = useSelector((state) => selectEventById(state, id));
    const isUserEvent = currentUser?.id === event?.user_id;
    const handleNavigate = () => {
        navigate('/user/' + event.user_id);
    }

    const handleDelete = () => {
        dispatch(deleteEvent(event.id));
        navigate('/');
    }

    const handleDeleteInvite = (id) => {
        dispatch(deleteInvite(id));
    }



    return <Container fluid="md" >
        {showFormUpdate && <EventForm setShowForm={setShowFormUpdate} showForm={showFormUpdate} data={event} />}
        {showInviteForm && <InviteForm setShowForm={setShowInviteForm} event_id={event.id} data={invite} />}
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
                    className="icon-overlay bg-primary cursor-pointer  border border-white p-2 rounded-circle position-absolute z-2" rounded fluid
                    onClick={handleNavigate}
                />

                {isUserEvent ? <Button bsPrefix="delete-overlay" className="position-absolute  z-2" onClick={handleDelete}><i className="bi bi-trash3"> </i></Button> : ''}

                <Card.Title className="bg-dark text-white">{event?.title}</Card.Title>
                <Card.Text className="bg-dark text-white">
                    {event?.date} | {event?.start_time} - {event?.end_time}
                </Card.Text>
            </Card.ImgOverlay>
            <Card.Body className="h-100 d-flex flex-column justify-content-between">

                <div >
                    <Card.Text className="mt-2">{event?.description}</Card.Text>
                    <Dropdown>
                        <Dropdown.Toggle>Visualizar Participantes</Dropdown.Toggle>

                        <Dropdown.Menu>
                            {eventInvites.map((val) => {
                                const user = userList.find((user) => user.id === val.user_id);
                                if (user) {
                                    return <Dropdown.Item key={'dropdown-item' + val.id} bsPrefix="my-dropdown-item" disabled={!isUserEvent} className="d-flex align-items-center my-dropdown-item px-2">

                                        <p className="m-0">{user.name}</p>

                                        {isUserEvent &&
                                            <>
                                                <Button className="bg-transparent border-0" onClick={() => {
                                                    setInvite(val)
                                                    setShowInviteForm(true)

                                                }}><i className="bi bi-pencil" ></i></Button>
                                                <Button className="bg-transparent border-0"><i className="bi bi-trash" onClick={() => handleDeleteInvite(val.id)}></i></Button>
                                            </>}
                                    </Dropdown.Item >
                                }
                                return ''
                            }
                            )}

                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div>
                    {
                        isUserEvent
                            ? (
                                <div>
                                    <Button className="bg-primary border-white rounded-0 me-2" onClick={() => setShowFormUpdate(true)}>Editar</Button>
                                    <Button className="bg-primary border-white rounded-0 ms-2" onClick={() => {
                                        setInvite({})
                                        setShowInviteForm(true)
                                    }}>Convidar</Button>

                                </div>)
                            : (<Button className="bg-primary border-white rounded-0" onClick={() => navigate(isAuthenticated ? '/path_para_criar_convite_próprio' : '/auth/register')}>Participar</Button>)}
                </div>
            </Card.Body>
        </Card>
    </Container >


}

export default EventPage;
