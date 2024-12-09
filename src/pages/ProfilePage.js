import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvites, selectUserInvites } from "../store/slices/InviteSlice";
import { fetchEventList, selectUserEvents, selectUserOldInvitedEvents } from "../store/slices/EventSlice";
import { selectCurrentUser, selectIsAuthenticated } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";
import PlaceholderImage from "../assets/placeholder.jpeg";
import { EventCard } from "../components/EventCard";
import { fetchAllFeedbacks, selectUserFeedbacks } from "../store/slices/FeedbackSlice";
import "../styles/ProfilePage.css";
import InviteCard from "../components/InviteCard";

const ProfilePage = (props) => {

    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        navigate('/auth/register')
    }

    const dispatch = useDispatch();

    dispatch(fetchAllInvites());
    dispatch(fetchEventList());
    dispatch(fetchAllFeedbacks())

    const user = useSelector(selectCurrentUser);
    const userInvites = useSelector((state) => selectUserInvites(state, user.id));
    const userEvents = useSelector((state) => selectUserEvents(state, user.id));
    const userFeedbacks = useSelector((state) => selectUserFeedbacks(state, user.id));


    const invitesId = userInvites.filter((invite) => invite.status === 'confirmed').map((val) => val.eventId);

    const userOldInvitedEvents = useSelector((state) => selectUserOldInvitedEvents(state, invitesId));


    return (<Container>

        <div className="my-5">
            <h1>Seus Eventos</h1>
            <div className="d-flex  mx-auto scroll-container-horizontal py-5  overflow-x-scroll" >
                {userEvents.map((val, index) =>

                    <div className="card-container-horizontal mx-5 col-sm-6 col-lg-4" style={{ minWidth: '350px' }} key={'event-card-' + index}>
                        <EventCard val={val} />
                    </div>
                )}
            </div>

        </div>

        <div className="my-5">
            <h1>Seus convites</h1>
            <div className=" scroll-container-horizontal d-flex overflow-x-scroll py-5 justify-content-center">
                {userInvites.map(val => <InviteCard val={val} key={'invite-card-' + val.id} />)}
                {/* {userInvites.map(val =>
                    <Card className="card-container-horizontal py-4 px-2 mx-5" style={{ minWidth: '300px', maxWidth: '300px' }} key={'invite-' + val.id}>
                        <Card.Header>
                            <h2>{val.event.title}</h2>
                        </Card.Header>

                        <Card.Body>
                            {val.status === 'pending' && <div>
                                <p className="text-caption">Confirmar presença:</p>

                                <div className="d-flex justify-content-around">
                                    <Button className="bg-transparent rounded-5" style={{ borderColor: 'green', color: 'green' }}><i className="bi bi-check"></i></Button>
                                    <Button className="bg-transparent rounded-5" style={{ borderColor: 'var(--bs-form-invalid-color)', color: 'var(--bs-form-invalid-color)' }}><i className="bi bi-x"></i></Button>
                                </div>
                            </div>}

                            {val.status === 'confirmed' && <h4 className="text-center" >Presença confirmada!</h4>}

                        </Card.Body>


                    </Card>
                )} */}

            </div>
        </div>

        <div className="my-5">
            <h1>Eventos Passados</h1>
            <div className="d-flex justify-content-center">
                {userOldInvitedEvents.map((event) => {

                    const eventFeedback = userFeedbacks.find((feedback) => feedback.eventId === event.id);

                    return <Card key={'card-event-feedback-' + event.id} style={{ width: '300px' }}>
                        <Card.Img
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = PlaceholderImage;
                            }}
                            variant="top"
                            src={event?.img ? event?.img : PlaceholderImage}
                            height={200}
                        />
                        <Card.ImgOverlay style={{ height: '200px' }}>
                            <Card.Text className="bg-dark text-white h5 p-2">{event.title}</Card.Text>
                        </Card.ImgOverlay>
                        <Card.Body>

                            <FeedbackForm eventId={event.id} data={eventFeedback} />
                        </Card.Body>

                    </Card>

                }
                )}
            </div>
        </div>
    </Container >);
}

export default ProfilePage;