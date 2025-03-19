// routes/authRoutes.ts → Rotas de login/cadastro.

import { RequestHandler, Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware'
import { userSchema } from '../shared/userSchemas';

const router = Router();

//Rota Inicial
// O express nao espara q os middlewares retornem alguma coisa, deve ser void;
router.post('/auth/register', authMiddleware(userSchema), (req, res) => {AuthController.registerUser(req,res)});
router.post('/auth/register', authMiddleware(userSchema.omit(['name'])), (req, res) => {AuthController.loginUser(req,res)});

export { router };