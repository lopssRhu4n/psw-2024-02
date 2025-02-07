import { Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList, selectAvailableUsersForEvent, selectCurrentAuthStatus } from "../store/slices/AuthSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { inviteSchema } from "../validation/InviteSchema";
import { addNewInvite, fetchAllInvites, selectAllInvites, selectInvitesStatus, updateInvite } from "../store/slices/InviteSlice";

const InviteForm = (props) => {

    const invites = useSelector((state) => selectAllInvites(state));
    const userList = useSelector((state) => selectAvailableUsersForEvent(state, props.eventOwner));
    const dispatch = useDispatch();
    const userListFetchingStatus = useSelector(selectCurrentAuthStatus);
    const invitesStatus = useSelector(selectInvitesStatus);
    console.log(Object.values(props.data).length)

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(inviteSchema),
        defaultValues: props.data
    })


    useEffect(() => {
        dispatch(fetchUsersList());
        dispatch(fetchAllInvites())
    }, [userListFetchingStatus, invitesStatus, dispatch]);

    const onSubmit = (invite) => {
        if (Object.values(props.data).length) {
            dispatch(updateInvite(invite))
        } else {
            invite.event = props.event_id;
            // invite.status = 'pending';
            dispatch(addNewInvite(invite));
        }

        props.setShowForm(false);
    };

    return (
        <Form
            className="border rounded-1 position-fixed z-3 top-50 start-50 translate-middle bg-body py-4 px-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Row className="d-flex my-3 px-2 justify-content-between">
                <div style={{ width: 'auto' }} className="h2">{Object.values(props.data).length ? 'Editar Convite' : 'Convidar para Evento'}</div>
                <Button className="rounded-circle bg-body border-0" style={{ width: 'auto' }} onClick={() => props.setShowForm(false)}>
                    <i className="bi bi-x-lg" width="32" height="32"></i>
                    {props.showForm}
                </Button>
            </Row>

            <div className="w-75 mx-auto">
                {/* <Row className="my-3"> */}
                <Form.Group className="mb-3">
                    <Form.Select disabled={Object.values(props.data).length} {...register('user')} bsPrefix="" className="" >
                        {Object.values(props.data).length ? <option>{userList.find(user => user._id === props.data.user).name}</option> : <option value="">Selecione o convidado</option>}
                        {userList.filter(val => invites.findIndex(invite => invite.user === val._id && invite.event === props.event_id) === -1)
                            .map((val) => {
                                return (<option value={val._id} key={val._id + '-option'}>{val.name}</option>)
                            })}
                    </Form.Select>
                    <span className="error-span">{errors.user?.message}</span>
                </Form.Group>
                {/* </Row> */}

                {/* <Row className="my-3"> */}
                <Form.Group className="col">
                    <Form.Group controlId="form-invite-message" >
                        <Form.Control
                            bsPrefix="my-form-control"
                            name="description"
                            as="textarea"
                            placeholder="Mensagem"
                            {...register('text')}
                            rows="3"
                            className={(errors.text?.message === undefined ? '' : 'error-input') + ' pa-0'}
                        />
                        <span className="error-span">{errors.text?.message}</span>
                    </Form.Group>
                </Form.Group>

                <div className="w-100 d-flex justify-content-end">
                    <Button type="submit" className="bg-primary border-white rounded-0">
                        {Object.values(props.data).length ? 'Atualizar' : 'Criar'}
                    </Button>
                </div>

                {/* </Row> */}
            </div>

        </Form>
    );
}

export default InviteForm;