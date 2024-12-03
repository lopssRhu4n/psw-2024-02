import { Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList, selectAllUsers, selectCurrentAuthStatus } from "../store/slices/AuthSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { inviteSchema } from "../validation/InviteSchema";
import { addNewInvite } from "../store/slices/InviteSlice";

const InviteForm = (props) => {

    const userList = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const userListFetchingStatus = useSelector(selectCurrentAuthStatus);

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(inviteSchema),
    })

    useEffect(() => {
        dispatch(fetchUsersList());
    }, [userListFetchingStatus, dispatch]);

    const onSubmit = (invite) => {
        dispatch(addNewInvite(invite));
    };

    return (
        <Form
            className="border rounded-1 position-fixed z-3 top-50 start-50 translate-middle bg-body py-4 px-3"
            onSubmit={() => {
                console.log('aqui')
                handleSubmit(onSubmit)
            }}
        >
            <Row className="d-flex my-3 px-2 justify-content-between">
                <div style={{ width: 'auto' }} className="h2">Convidar para Evento</div>
                <Button className="rounded-circle bg-body border-0" style={{ width: 'auto' }} onClick={() => props.setShowForm(false)}>
                    <i className="bi bi-x-lg" width="32" height="32"></i>
                    {props.showForm}
                </Button>
            </Row>

            <div className="w-75 mx-auto">
                {/* <Row className="my-3"> */}
                <Form.Select bsPrefix="" className="mb-3" >
                    <option>Selecione o convidado</option>
                    {userList.map((val) => {
                        return (<option value={val.id} key={val.id + '-option'}>{val.name}</option>)
                    })}
                </Form.Select>
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
                    <Button type="submit" className="bg-primary border-white rounded-0">Criar</Button>
                </div>

                {/* </Row> */}


            </div>

        </Form>
    );
}

export default InviteForm;