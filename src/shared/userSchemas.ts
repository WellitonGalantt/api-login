import * as yup from 'yup';
import { IUser } from './interfaces'

export const userSchema: yup.ObjectSchema<IUser> = yup.object().shape({
  id: yup.number().optional(),
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email ivalido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter no minimo 6 caracters!').required('Senha é obrigatória'),
});