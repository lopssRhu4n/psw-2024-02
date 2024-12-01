import { ptForm } from "yup-locale-pt";
import * as yup from "yup";
yup.setLocale(ptForm);

export const loginSchema = yup.object(
    {
        email: yup.string().required(),
        password: yup.string()
            .required()
            .min(8)
    }
).required();
