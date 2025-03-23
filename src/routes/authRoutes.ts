// routes/authRoutes.ts → Rotas de login/cadastro.

import { RequestHandler, Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateSchema, authMiddleware } from '../middlewares/authMiddleware'
import { userSchema } from '../shared/userSchemas';

const router = Router();

//Rota Inicial
// O express nao espara q os middlewares retornem alguma coisa, deve ser void;
router.post('/auth/register', validateSchema(userSchema), (req, res) => { AuthController.registerUser(req, res) });
router.post('/auth/login', validateSchema(userSchema.omit(['name'])), (req, res) => { AuthController.loginUser(req, res) });
router.get('/auth/user', authMiddleware, (req, res) => { AuthController.getUser(req, res) });

export { router };