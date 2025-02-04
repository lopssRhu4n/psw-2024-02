import { ptForm } from "yup-locale-pt";
import * as yup from "yup";
yup.setLocale(ptForm);

const specialCharRegEx = /[!@#$%^&*(),.?":{}|<>]/;
const uppercaseRegEx = /[A-Z]/;
const lowerCaseRegEx = /[a-z]/;
const hasNumberRegEx = /[0-9]/;
// const cpfRegex = /^(\d{ 3}\.\d{ 3}\.\d{ 3}-\d{ 2 }|\d{ 11 })$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

export const registerSchema = yup.object(
    {
        name: yup.string().required().min(15).max(50),
        password: yup.string()
            .required()
            .min(8)
            .matches(specialCharRegEx, { message: 'A senha deve conter no mínimo um caracter especial.' })
            .matches(uppercaseRegEx, { message: 'A senha deve conter ao menos um caracter maiúsculo.' })
            .matches(lowerCaseRegEx, { message: 'A senha deve conter ao menos um caracter minúsculo.' })
            .matches(hasNumberRegEx, { message: 'A senha deve conter ao menos um número.' }),
        confirmPassword: yup.string()
            .required()
            .oneOf([yup.ref("password"), null], "As senhas devem ser iguais."),
        cpf: yup.string()
            .required()
            .matches(cpfRegex, { message: 'O CPF deve estar no formato 111.111.111-11' }),
        email: yup.string()
            .required()
            .email(),
        img: yup.mixed().required('É necessário escolher a imagem de perfil.')
    }
).required();
