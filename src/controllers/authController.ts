// controllers/authController.ts → Lógica de autenticação.
import { Request, Response } from 'express';
import { AuthRequest, IUser } from '../shared/interfaces';
import { StatusCodes } from 'http-status-codes';
import { AuthProvider } from '../providers/AuthProvider';
import { gerarToken } from '../utils/authVerifyJwt';

export class AuthController {

  static async getUser(req: AuthRequest, res: Response) {
    try{
      const userId = req.user?.id;
      if(!userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'ID do usuário não encontrado!',
        })
      }
      const user = await AuthProvider.getUser(userId);

      if(user instanceof Error){
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Erro ao buscar usuario no banco de dados!',
          error: user.message,
        })
      }

      return res.status(StatusCodes.OK).json({
        message: 'Usuário encontrado com sucesso!',
        data: user,
      })
    }
    catch(error){
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Erro ao buscar usuario!',
        error: error,
      })
    }
  }

  static async loginUser(req: Request<{}, {}, IUser>, res: Response): Promise<Response> {
    console.log('Controller:');
    console.log(req.body);

    const result = await AuthProvider.loginUser(req.body)
    if(result instanceof Error){
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Erro ao tentar se logar!',
        error: result.message,
      })
    }

    const token = gerarToken(result, 'user');

    res.setHeader("Authorization", `Bearer ${token}`);
    console.log("Headers recebidos:", req.headers);

    return res.status(StatusCodes.OK).json({
      message: 'Login realizado com sucesso!',
      id: result,
      token: token,
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