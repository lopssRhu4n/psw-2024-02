
import { Button, Card, } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateInvite } from "../store/slices/InviteSlice";
import { fetchUsersList, selectUserById } from "../store/slices/AuthSlice";
import { selectEventById } from "../store/slices/EventSlice";

const InviteCard = (props) => {

    const dispatch = useDispatch();
    dispatch(fetchUsersList());

    const inviteEvent = useSelector((state) => selectEventById(state, props.val?.event));
    const senderUser = useSelector((state) => selectUserById(state, inviteEvent ? inviteEvent.user : ''));

    const handleButtonClick = (status) => {
        const data = { ...props.val }
        delete data['event'];


        dispatch(updateInvite({
            // ...data,
            _id: data._id,
            status
        }))

    }

    return (<Card className="card-container-horizontal py-4 px-2 mx-5" style={{ minWidth: '300px', maxWidth: '300px' }} key={'invite-' + props.val._id}>
        <Card.Header>
            <h2>{props.val.event?.title}</h2>
            <div>
                <p>Evento de: {senderUser?.name}</p>
            </div>
        </Card.Header>

        <Card.Body>
            {props.val.status === 'pending' && <div>
                <p className="text-caption">Confirmar presença:</p>

                <div className="d-flex justify-content-around">
                    <Button className="bg-transparent rounded-5" onClick={() => handleButtonClick('confirmed')} style={{ borderColor: 'green', color: 'green' }}><i className="bi bi-check"></i></Button>
                    <Button className="bg-transparent rounded-5" onClick={() => handleButtonClick('denied')} style={{ borderColor: 'var(--bs-form-invalid-color)', color: 'var(--bs-form-invalid-color)' }}><i className="bi bi-x"></i></Button>
                </div>
            </div>}

            {props.val.status === 'confirmed' && <h4 className="text-center" >Presença confirmada!</h4>}

            {props.val.status === 'denied' && <h4 className="text-center">Convite recusado.</h4>}

        </Card.Body>


    </Card>
    );
}

export default InviteCard;