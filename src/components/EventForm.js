import { Form, Row, Button } from "react-bootstrap";
import { useDispatch, } from "react-redux";
import { addNewEvent, updateEvent } from "../store/slices/EventSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "../validation/EventSchema";
import DefaultInput from "./Form/DefaultInput";
import ImageInput from "./Form/ImageInput";

export const EventForm = (props) => {
    const dispatch = useDispatch();
    const { handleSubmit, watch, register, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(eventSchema),
        defaultValues: props.data
    })

    if (props.data) {
        setValue('date', new Date(props.data.date));
    }
    const onSubmit = (data) => {
        // let requestData = { ...data };
        const requestData = new FormData();

        Object.keys(data).forEach((key) => {
            requestData.append(key, data[key]);
        })

        if (props.data) {
            dispatch(updateEvent(requestData))
        } else {
            dispatch(addNewEvent(requestData));
        }
        props.setShowForm(false);
    }

    return (

        <Form className="border rounded-1 position-fixed z-3  w-75 h-75 bg-body py-4 px-3 overflow-x-hidden  overflow-y-scroll" onSubmit={handleSubmit(onSubmit)}>
            <Row className="d-flex my-3 px-2 justify-content-between">
                <div style={{ width: 'auto' }} className="h2"> {props.data ? 'Atualizar Evento' : 'Criar Evento'} </div>
                <Button className="rounded-circle bg-body border-0" style={{ width: 'auto' }} onClick={() => props.setShowForm(false)}>
                    <i className="bi bi-x-lg" width="32" height="32"></i>
                </Button>
            </Row>

            <Row className="my-3">
                <DefaultInput className="col-12 col-md-6" field={'title'} register={register} placeholder={'Digite o nome do evento'} errors={errors} />
                <DefaultInput className="col-12 col-md-6" field={'location'} register={register} placeholder={'Local do Evento'} errors={errors} />
            </Row>

            <Row className="my-3 justify-content-between">
                <Row className="col-12 col-md-6 pe-md-0">
                    <ImageInput register={register} watch={watch} field={'img'} errors={errors} setValue={setValue} placeholder={'Imagem'} />
                </Row>

                <Row className="col-12 col-md-6 ps-md-0 justify-content-center">
                    <DefaultInput
                        className="col-12  ps-md-0 d-flex flex-column justify-content-end"
                        placeholder={'Data do evento:'}
                        field={'date'}
                        register={register}
                        errors={errors}
                        type="date"
                    />
                    <div className="row justify-content-between px-0">
                        <DefaultInput className="col d-flex flex-column ps-0 justify-content-end" placeholder={'Início:'} register={register} errors={errors} field={'start_time'} type="time" />
                        <DefaultInput className="col d-flex flex-column ps-0 justify-content-end" placeholder={'Fim:'} register={register} errors={errors} field={'end_time'} type="time" />
                    </div>
                </Row>

            </Row>
            <Row className="my-3">
                <DefaultInput className="col" placeholder={'Capacidade'} field={'capacity'} register={register} errors={errors} type="number" />
                <DefaultInput className="col" placeholder={'Preço do evento'} field={'price'} register={register} errors={errors} type="number" />
            </Row>

            <Row>
                <Form.Group controlId="form-event-description">
                    <Form.Control
                        bsPrefix="my-form-control"
                        name="description"
                        as="textarea"
                        placeholder="Descrição do Evento"
                        {...register('description')}
                        rows="3"
                        className={errors.description?.message === undefined ? '' : 'error-input'}
                    />
                    <span className="error-span">{errors.description?.message}</span>
                </Form.Group>
            </Row>

            <Button type="submit" className="mt-4 bg-primary border-white rounded-0">{props.data ? 'Atualizar Evento' : 'Criar evento'}</Button>
        </Form >

    );
}
