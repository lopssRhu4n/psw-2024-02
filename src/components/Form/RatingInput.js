import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const RatingInput = ({ register, field, errors, getValues, readOnly }) => {
    // // console.log(getValues(field))
    const ratingVal = getValues(field)
    // console.log(ratingVal);
    const [rating, setRating] = useState(ratingVal);

    useEffect(() => {
        setRating(ratingVal);
    }, [ratingVal])
    return (

        <div className="d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center my-2">

                {
                    [...Array(5)].map((star, index) => {
                        const currentRate = index + 1;

                        return <div key={'rating-' + index}> <Form.Check bsPrefix="my-form-check">
                            <Form.Check.Label>
                                <Form.Check.Input
                                    readOnly={readOnly}
                                    value={currentRate}
                                    onClick={() => {
                                        if (!readOnly)
                                            setRating(currentRate)

                                    }} className="invisible" type="radio" {...register(field)} />
                                <i className="bi bi-star-fill" style={{ color: currentRate <= rating ? 'yellow' : 'gray' }}></i>
                            </Form.Check.Label>

                        </Form.Check>

                        </div>
                    })
                }

            </div>

            <span className="error-span text-center">{errors[field]?.message}</span>
        </div>);
}

export default RatingInput;