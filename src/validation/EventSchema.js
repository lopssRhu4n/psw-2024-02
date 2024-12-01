import { ptForm } from "yup-locale-pt";
import * as yup from "yup";
yup.setLocale(ptForm);
export const eventSchema = yup.object(
    {
        title: yup.string().required().min(8).max(30),
        description: yup.string().required().min(20).max(255),
        location: yup.string()
            .required(),
        price: yup.number()
            .required().positive(),
        date: yup.date().required(),
        start_time: yup.string().required(),
        end_time: yup.string().required(),
        capacity: yup.number().positive(),
        img: yup.string()
    }
).required();
