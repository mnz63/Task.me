import * as yup from "yup"

export const schemaRegister = yup.object({
  username: yup.string().min(4, "Insira pelo menos 4 caracteres").required('O nome de usuário é obrigatório'),
  email: yup.string().email('Insira um endereço de e-mail válido').required('O e-mail é obrigatório'),
  password: yup.string().min(6, "Insira pelo menos 6 caracteres").required('A senha é obrigatória'),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais").required('Confirme sua senha')
}).required()

export const schemaLogin = yup.object({
  email: yup.string().email('Insira um endereço de e-mail válido').required('O e-mail é obrigatório'),
  password: yup.string().required('A senha é obrigatória')
}).required()