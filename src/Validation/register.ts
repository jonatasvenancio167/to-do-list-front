import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  email: z.string().nonempty('O e-mail é obrigatório').email('Formato de e-mail invalido'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres')
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'], 
});


export { RegisterSchema }