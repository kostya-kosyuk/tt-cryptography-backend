import express from 'express';

import loginValidationRules from '../middlewares/loginValidation';
import registrationValidationRules from '../middlewares/registrationValidation';

import { registration, login, logout } from '../controllers/auth';
import authMiddleware from '../middlewares/auth';

const authRouter = express.Router();

authRouter.post(
    '/registration',
    registrationValidationRules(),
    registration
);
authRouter.post(
    '/login',
    loginValidationRules(),
    login
);
authRouter.post('/logout', authMiddleware , logout);

export default authRouter;