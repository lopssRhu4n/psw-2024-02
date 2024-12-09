import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { feedbackSchema } from "../validation/FeedbackSchema";
import RatingInput from "./Form/RatingInput";
import "../styles/FeedbackForm.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/slices/AuthSlice";
import { addNewFeedback, deleteFeedback, updateFeedback } from "../store/slices/FeedbackSlice";
import { useEffect, useState } from "react";


const FeedbackForm = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [isEditing, setIsEditing] = useState(false);

    const { handleSubmit, register, formState: { errors }, reset, getValues } = useForm({
        resolver: yupResolver(feedbackSchema),
        defaultValues: props.data
    })

    let feedbackExists = props.data && Object.values(props.data).length;

    // Forçando update do formulário para preenchimento de dados quando o feedback já existe
    useEffect(() => {
        // console.log(props.data);
        if (props.data && Object.values(props.data).length) {
            reset(props.data);
        } else if (!props.data) {
            reset({ text: '', rating: null });
        }
    }, [props.data, reset])


    const onFormSubmit = (feedback) => {
        if (props.data && Object.values(props.data).length) {
            dispatch(updateFeedback(feedback));
            setIsEditing(false);
        } else {
            feedback.eventId = props.eventId;
            feedback.userId = user.id;
            dispatch(addNewFeedback(feedback));
        }
    }

    const handleDelete = () => {
        dispatch(deleteFeedback(props.data.id));
    };


    return (<Form className="my-3 px-2 py-1 position-relative" onSubmit={handleSubmit(onFormSubmit)}>

        {
            (feedbackExists && !isEditing) &&
            <>
                <Button className="rounded-5 bg-black position-absolute" onClick={() => setIsEditing(true)} style={{ top: '-15px', right: 0 }}><i className="bi bi-pen"></i></Button>
            </>
        }

        <Form.Group controlId="form-feedback-text" >
            <Form.Control
                bsPrefix="my-form-control"
                name="description"
                as="textarea"
                placeholder="Feedback"
                {...register('text')}
                rows="3"
                className={(errors.text?.message === undefined ? '' : 'error-input') + ' pa-0'}
                readOnly={feedbackExists && !isEditing}
            />
            <span className="error-span">{errors.text?.message}</span>
        </Form.Group>

        <RatingInput register={register} errors={errors} field={'rating'} getValues={getValues} readOnly={feedbackExists && !isEditing} />



        {

            (feedbackExists && !isEditing) &&
            <div className="d-flex justify-content-center">
                <Button bsPrefix="" className=" rounded-5 border-red bg-black  my-2" onClick={handleDelete}><i className="bi bi-trash3"> </i></Button>
            </div>

        }
        {(!(props.data && Object.values(props.data)) || isEditing) && <Button type="submit" className="my-2  bg-primary border-white rounded-0" >Enviar Feedback</Button>
        }

    </Form>
    );
}

export default FeedbackForm;