import { Button, Card, Container, Dropdown, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlaceholderImage from "../assets/placeholder.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchEventList, selectEventById, selectEventsStatus } from "../store/slices/EventSlice";
import '../styles/EventPage.css'
import { useEffect, useState } from "react";
import { EventForm } from "../components/EventForm";
import { fetchUsersList, selectAllUsers, selectCurrentAuthStatus, selectCurrentUser, selectIsAuthenticated, selectUserById } from "../store/slices/AuthSlice";
import InviteForm from "../components/InviteForm";
import { addNewInvite, deleteInvite, fetchAllInvites, selectEventInvites, selectInvitesStatus } from "../store/slices/InviteSlice";
import { calculateIfEventIsOver } from "../utils/utils";
import { fetchAllFeedbacks, selectEventFeedbacks, selectFeedbackStatus } from "../store/slices/FeedbackSlice";
import { setLoading } from "../store/slices/GlobalSlice";

const EventPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const eventInvites = useSelector((state) => selectEventInvites(state, id));
    const userList = useSelector(selectAllUsers)
    const inviteStatus = useSelector(selectInvitesStatus);
    const eventStatus = useSelector(selectEventsStatus);
    const feedbackStatus = useSelector(selectFeedbackStatus);
    const authStatus = useSelector(selectCurrentAuthStatus);
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [invite, setInvite] = useState({});

    dispatch(fetchEventList());
    dispatch(fetchAllFeedbacks());
    dispatch(fetchUsersList());

    useEffect(() => {
        dispatch(fetchAllInvites());
    }, [dispatch, id, inviteStatus])

    useEffect(() => {
        if (eventStatus === 'pending' || feedbackStatus === 'pending' || authStatus === 'pending' || inviteStatus === 'pending') {
            dispatch(setLoading(true));
        } else {
            dispatch(setLoading(false));
        }
    })


    const currentUser = useSelector(selectCurrentUser);
    const event = useSelector((state) => selectEventById(state, id));
    const eventOwner = useSelector(state => selectUserById(state, event?.user));
    const eventFeedbacks = useSelector(state => selectEventFeedbacks(state, id));

    const calculateAverageRating = () => {
        return (eventFeedbacks.map(val => val.rating).reduce((acc, cur) => acc += cur) / eventFeedbacks.length).toFixed(2);
    }

    const isUserEvent = currentUser?._id === event?.user;
    const isUserParticipating = eventInvites.findIndex(invite => invite.user === currentUser?._id) !== -1;

    const handleDelete = () => {
        dispatch(deleteEvent(event._id));
        navigate('/');
    }

    const handleDeleteInvite = (id) => {
        dispatch(deleteInvite(id));
    }

    const handleAskToParticipate = () => {
        if (isAuthenticated) {
            const invite = {
                event: id,
                user: currentUser._id,
                text: '',
                // status: 'confirmed'
            }
            dispatch(addNewInvite(invite));
            return;
        }
        navigate('/auth/register')
    }

    const isEventOver = calculateIfEventIsOver(event);
    const renderExcludeTooltip = (props) => (
        <Tooltip id="exclude-tooltip" {...props}>
            Excluir evento
        </Tooltip>
    )

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Criador: {eventOwner?.name}
        </Tooltip>
    )

    const renderCardActions = () => {
        if (isEventOver) {
            return <h2>O evento já acabou.</h2>
        }
        else if (isUserEvent) {
            return <div>
                <Button className="bg-primary border-white rounded-0 me-2" onClick={() => setShowFormUpdate(true)}>Editar</Button>
                <Button className="bg-primary border-white rounded-0 ms-2" onClick={() => {
                    setInvite({})
                    setShowInviteForm(true)
                }}>Convidar</Button>

            </div>
        } else if (!isUserParticipating) {
            return <Button className="bg-primary border-white rounded-0" onClick={handleAskToParticipate}>Participar</Button>
        } else {
            return <h4>O evento ocorrerá em {event?.date.slice(0, 10)}</h4>
        }

    }


    return <Container fluid="md" >
        {showFormUpdate && <EventForm setShowForm={setShowFormUpdate} showForm={showFormUpdate} data={event} />}
        {showInviteForm && <InviteForm setShowForm={setShowInviteForm} event_id={event._id} data={invite} eventOwner={event.user} />}
        <Card className="mb-3" style={{ minHeight: '75vh' }}>
            <Card.Img
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = PlaceholderImage;
                }}
                variant="top"
                src={event?.img ? 'http://localhost:3004' + event?.img : PlaceholderImage}
                height={300}
            />
            <Card.ImgOverlay className="text-dark flex" style={{ maxHeight: '350px' }}>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100, hide: 100 }}
                    overlay={renderTooltip}
                >
                    <Image
                        width={50}
                        height={50}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = PlaceholderImage;
                        }}
                        src={eventOwner ? 'http://localhost:3004' + eventOwner.img : PlaceholderImage}
                        className=" bg-primary cursor-pointer  border border-white  rounded-circle position-absolute z-2 icon-overlay" rounded fluid
                    />


                </OverlayTrigger>
                {(isUserEvent && !isEventOver) &&

                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 100, hide: 100 }}
                        overlay={renderExcludeTooltip}
                    >
                        <Button bsPrefix="delete-overlay" className="position-absolute  z-2" onClick={handleDelete}>
                            <i className="bi bi-trash3"></i>
                        </Button>
                    </OverlayTrigger>
                }

                <Card.Title className="d-flex text-white"><div className="rounded p-2 w-auto" style={{ backgroundColor: 'rgba(75, 75, 75, 0.2)' }}>{event?.title}</div></Card.Title>
                <Card.Text className="d-flex text-white p-1">
                    <div className="w-auto rounded p-2" style={{ backgroundColor: 'rgba(75, 75, 75, 0.2)' }}>
                        {event?.date.slice(0, 10)} | {event?.start_time} - {event?.end_time}
                    </div>
                </Card.Text>
            </Card.ImgOverlay>
            <Card.Body className="h-100 d-flex flex-column">
                <div >
                    <Card.Text className="mt-2">{event?.description}</Card.Text>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            Avaliação <i className="bi bi-star-fill mx-1 text-center" style={{ color: 'yellow' }}></i>: {eventFeedbacks.length && calculateAverageRating()}
                        </div>
                        <Dropdown className="">
                            <Dropdown.Toggle className="bg-body border-primary">
                                {/* Participantes: {eventInvites.length + '/' + event.capacity} */}
                                <i className="bi bi-people-fill me-3"></i>
                                {eventInvites.length + '/' + event?.capacity}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {eventInvites.length ? eventInvites.map((val) => {
                                    const user = userList.find((user) => user._id === val.user);
                                    if (user) {
                                        return <Dropdown.Item key={'dropdown-item' + val.id} bsPrefix="my-dropdown-item" disabled={!isUserEvent} className="d-flex align-items-center my-dropdown-item px-2">

                                            <p className="m-0">{user.name}</p>

                                            {(isUserEvent && !isEventOver) &&
                                                <>
                                                    <Button className="bg-transparent border-0" onClick={() => {
                                                        setInvite(val)
                                                        setShowInviteForm(true)

                                                    }}><i className="bi bi-pencil" ></i></Button>
                                                    <Button className="bg-transparent border-0"><i className="bi bi-trash" onClick={() => handleDeleteInvite(val._id)}></i></Button>
                                                </>}
                                        </Dropdown.Item >
                                    }
                                    return ''
                                }
                                ) : <p className="p-2">Sem convidados.</p>}

                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>

                <div className="mt-2">
                    <h5>Feedbacks:</h5>
                    {eventFeedbacks.length ? <div className="overflow-x-scroll p-3 d-flex" style={{ gap: 20 }}>
                        {eventFeedbacks.map((feedback) => {
                            return <Card className="" style={{ width: '200px' }}>
                                <Card.Header className="h6">{feedback.userId}</Card.Header>
                                <Card.Body style={{ height: '105px' }}>
                                    <div>{feedback.text}</div>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-center" >
                                    {
                                        [...Array(5)].map((star, index) => {
                                            const currentRate = index + 1;
                                            return <i className="bi bi-star-fill" style={{ color: currentRate <= feedback.rating ? 'yellow' : 'gray' }}></i>
                                        })
                                    }
                                </Card.Footer>
                            </Card>
                        })}

                    </div> : <h6> Não há feedbacks para este evento.</h6>}
                </div>
            </Card.Body>
            <Card.Footer>
                <div>
                    {renderCardActions()}
                </div>
            </Card.Footer>
        </Card>
    </Container >


}

export default EventPage;
