import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { loginValidation } from '../validators/auth.validator.js';
import { handleValidationErrors } from '../middleware/validation.middleware.js';

const authRouter = Router();

// ROTA POST /login - Autentica um usuário e retorna um token.
authRouter.post(
    '/login',
    loginValidation,         // 1. Aplica as regras de validação.
    handleValidationErrors,  // 2. Lida com os erros de validação, se houver.
    AuthController.login     // 3. Se a validação passar, chama o controlador.
);

export default authRouter;