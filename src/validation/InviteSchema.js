import { ptForm } from "yup-locale-pt";
import * as yup from "yup";
yup.setLocale(ptForm);

export const inviteSchema = yup.object(
    {
        user_id: yup.string().required(),
        text: yup.string()
            .required()
            .min(8)
    }
).required();
