// controllers/authController.ts → Lógica de autenticação.
import { Request, Response } from 'express';
import { IUser } from '../shared/interfaces';
import { StatusCodes } from 'http-status-codes';
import { AuthProvider } from '../providers/AuthProvider';

export class AuthController {

  static async loginUser(req: Request<{}, {}, IUser>, res: Response) {
    console.log('Controller:');
    console.log(req.body);

    const result = await AuthProvider.loginUser(req.body)
    if(result instanceof Error){
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Erro ao tentar se logar!',
        error: result.message,
      })
    }

    return res.status(StatusCodes.OK).json({
      message: 'Login realizado com sucesso!',
      id: result,
    })
  }

  static async registerUser(req: Request<{}, {}, IUser>, res: Response) {

    console.log('Controller:');
    console.log(req.body);

    // Tentativa de crud, caso nao seja feito, retorna um erro.
    const result = await AuthProvider.registerUser(req.body)
    if (result instanceof Error) {
      console.log('Result:');
      console.error(result);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Erro ao tentar criar um usuário!',
        error: result.message,
      })
    }

    return res.status(StatusCodes.CREATED).json({
      message: 'Usuário criado com sucesso!',
      id: result,
    })
  }
}