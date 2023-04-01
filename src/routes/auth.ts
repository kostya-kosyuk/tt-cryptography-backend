import express from 'express';

import loginValidationRules from '../middlewares/loginValidation';
import registrationValidationRules from '../middlewares/registrationValidation';

import { registration, login } from '../controllers/auth';

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

export default authRouter;