// middlewares/authMiddleware.ts → Proteção de rotas.

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { IUser, AuthRequest } from '../shared/interfaces';
import { verificarToken } from '../utils/authVerifyJwt';

export const validateSchema = (schema: yup.ObjectSchema<IUser | Omit<IUser, 'name'>>) => {

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

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {

    console.log("Headers recebidos:", req.headers);
    // Pegar o token do header;
    const token = req.headers.authorization?.split(" ")[1]; // Vem em formato "bearer @mdwmd" usamos o split q retorna um array, pegando o segundo elemento.
    console.log('Middlewaare');
    console.log(token);

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Token não fornecido!',
        })
        return;
    }
    else {
        try {
            const decodedToken = verificarToken(token);
            if (!decodedToken) {
                res.status(401).json({ error: "Token inválido ou expirado." })
                return;
            }

            req.user = decodedToken as { id: number; role: string };
            next();
        }
        catch (error) {
            res.status(401).json({ error: "Token inválido ou expirado." })
            return;
        }
    }
}