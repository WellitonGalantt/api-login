// middlewares/authMiddleware.ts → Proteção de rotas.

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IUser } from '../shared/interfaces';

export const authMiddleware = (schema: yup.ObjectSchema<IUser | Omit<IUser, 'name'>>) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        await schema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((error) => {
            const yupError = error as yup.ValidationError;
            console.log(yupError.errors);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Acho que deu algo de errado na digitção dos dados...',
                errors: yupError.errors,
            })
        })
        
        
    }
}