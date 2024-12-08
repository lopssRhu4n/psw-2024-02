import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvites, selectUserInvites } from "../store/slices/InviteSlice";
import { fetchEventList, selectUserEvents, selectUserOldInvitedEvents } from "../store/slices/EventSlice";
import { selectCurrentUser, selectIsAuthenticated } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfilePage = (props) => {

    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        navigate('/auth/register')
    }

    const dispatch = useDispatch();
    dispatch(fetchAllInvites());
    dispatch(fetchEventList());

    const user = useSelector(selectCurrentUser);
    const userInvites = useSelector((state) => selectUserInvites(state, user.id));
    const userEvents = useSelector((state) => selectUserEvents(state, user.id));
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);


    const invitesId = userInvites.map((val) => val.eventId);

    const userOldInvitedEvents = useSelector((state) => selectUserOldInvitedEvents(state, invitesId));


    return (<Container>
        Página de perfil aqui


        {showFeedbackForm && <Form className="bg-black position-absolute top-50 start-50 translate-middle z-3 w-50 h-75">
            <Row className="d-flex my-3 px-2 justify-content-between">
                <div style={{ width: 'auto' }} className="h2">Deixar Feedback</div>
                <Button className="rounded-circle bg-body border-0" style={{ width: 'auto' }} onClick={() => setShowFeedbackForm(false)}>
                    <i className="bi bi-x-lg" width="32" height="32"></i>
                </Button>
            </Row>


        </Form>}

        <div className="my-5">
            <h1>Seus Eventos</h1>
            <div className="d-flex justify-content-center">

                {userEvents.map(val => <Card key={'event-' + val.id} onClick={() => navigate('/event/' + val.id)}> {val.title}</Card>)}
            </div>

        </div>

        <div className="my-5">
            <h1>Seus convites</h1>
            <div className="d-flex justify-content-center">
                {userInvites.map(val =>
                    <Card key={'invite-' + val.id}>
                        <h2>{val.event.title}</h2>


                        {val.status === 'pending' && <div>
                            Confirmar presença:
                            <Button className="bg-transparent rounded-5 border-white"><i className="bi bi-check"></i></Button>
                            <Button className="bg-transparent rounded-5 border-white"><i className="bi bi-x"></i></Button>

                        </div>}
                    </Card>
                )}

            </div>
        </div>

        <div className="my-5">
            <h1>Eventos Passados</h1>
            <div className="d-flex justify-content-center">
                {userOldInvitedEvents.map(val =>
                    <Card>
                        <Card.Header>
                            <Card.Text>{val.title}</Card.Text>
                            <Form className="my-3">
                                <h3>Feedback</h3>
                                <Form.Group controlId="feedback-form-text">
                                    <Form.Label>Texto</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Form>
                            <Button onClick={() => setShowFeedbackForm(true)}>Seu Feedback</Button>
                        </Card.Header>
                    </Card>

                )}
            </div>
        </div>
    </Container>);
}

export default ProfilePage;