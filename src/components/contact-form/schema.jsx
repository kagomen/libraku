import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .trim()
    .lowercase()
    .transform((value) => value.normalize('NFKC'))
    .required('入力は必須です'),
  email: yup
    .string()
    .required('入力は必須です')
    .email('正しい形式で入力してください'),
  body: yup
    .string()
    .trim()
    .required('入力は必須です')
})