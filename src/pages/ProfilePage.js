import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvites, selectInvitesStatus, selectUserInvites } from "../store/slices/InviteSlice";
import { fetchEventList, selectEventsStatus, selectUserEvents, selectUserOldInvitedEvents } from "../store/slices/EventSlice";
import { selectCurrentAuthStatus, selectCurrentUser, selectIsAuthenticated } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";
import PlaceholderImage from "../assets/placeholder.jpeg";
import { EventCard } from "../components/EventCard";
import { fetchAllFeedbacks, selectFeedbackStatus, selectUserFeedbacks } from "../store/slices/FeedbackSlice";
import "../styles/ProfilePage.css";
import InviteCard from "../components/InviteCard";
import { calculateIfEventIsOver } from "../utils/utils";
import { useEffect } from "react";
import { setLoading } from "../store/slices/GlobalSlice";

const ProfilePage = (props) => {

    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        navigate('/auth/register')
    }

    const dispatch = useDispatch();

    dispatch(fetchAllInvites());
    dispatch(fetchEventList());
    dispatch(fetchAllFeedbacks());

    const user = useSelector(selectCurrentUser);
    const userInvites = useSelector((state) => selectUserInvites(state, user._id));
    const userEvents = useSelector((state) => selectUserEvents(state, user._id));
    const userFeedbacks = useSelector((state) => selectUserFeedbacks(state, user._id));

    const authStatus = useSelector(selectCurrentAuthStatus);
    const inviteStatus = useSelector(selectInvitesStatus);
    const feedbackStatus = useSelector(selectFeedbackStatus);
    const eventsStatus = useSelector(selectEventsStatus);

    useEffect(() => {
        if (eventsStatus === 'pending' || feedbackStatus === 'pending' || authStatus === 'pending' || inviteStatus === 'pending') {
            dispatch(setLoading(true));
        } else {
            dispatch(setLoading(false));
        }
    })



    const notOverInvites = userInvites.filter(val => !calculateIfEventIsOver(val.event));

    const invitesId = userInvites.filter((invite) => invite.status === 'confirmed').map((val) => val.eventId);
    const userOldInvitedEvents = useSelector((state) => selectUserOldInvitedEvents(state, invitesId));


    return (<Container>

        <div className="my-5">
            <h1>Seus Eventos</h1>
            <div className="d-flex  mx-auto scroll-container-horizontal py-5  overflow-x-scroll" >
                {userEvents.length ? userEvents.map((val, index) =>

                    <div className="card-container-horizontal mx-5 col-sm-6 col-lg-4" style={{ minWidth: '350px' }} key={'event-card-' + index}>
                        <EventCard val={val} />
                    </div>
                ) : <h4>Você ainda não criou eventos.</h4>}
            </div>

        </div>

        <div className="my-5">
            <h1>Seus convites</h1>
            <div className=" scroll-container-horizontal d-flex overflow-x-scroll py-5 justify-content-center">
                {notOverInvites.length ? notOverInvites.map(val => <InviteCard val={val} key={'invite-card-' + val._id} />) : <h4>Não há convites para você.</h4>}
            </div>
        </div>

        <div className="my-5">
            <h1>Eventos Passados</h1>
            <div className="scroll-container-horizontal overflow-x-scroll py-5 d-flex justify-content-center">
                {userOldInvitedEvents.length ? userOldInvitedEvents.map((event) => {

                    const eventFeedback = userFeedbacks.find((feedback) => feedback.event === event._id);

                    return <Card key={'card-event-feedback-' + event._id} style={{ width: '300px' }}>
                        <Card.Img
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = PlaceholderImage;
                            }}
                            variant="top"
                            src={event?.img ? 'http://localhost:3004' + event?.img : PlaceholderImage}
                            height={200}
                        />
                        <Card.ImgOverlay style={{ height: '200px' }}>
                            <Card.Text className="bg-dark text-white h5 p-2">{event.title}</Card.Text>
                        </Card.ImgOverlay>
                        <Card.Body>
                            <FeedbackForm eventId={event._id} data={eventFeedback} userInvites={userInvites} />
                        </Card.Body>

                    </Card>

                }
                ) : <h4>Você não foi há nenhum evento ainda.</h4>}
            </div>
        </div>
    </Container >);
}

export default ProfilePage;