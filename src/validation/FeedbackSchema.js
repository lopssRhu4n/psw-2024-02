import { ptForm } from "yup-locale-pt";
import * as yup from "yup";
yup.setLocale(ptForm);

export const feedbackSchema = yup.object(
    {
        rating: yup.number('A avaliação deve ter entre 0 e 5 estrelas').min(0).max(5).required(),
        text: yup.string()
            .required()
            .min(8)
    }
).required();
