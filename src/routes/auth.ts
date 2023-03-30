import express from 'express';

import { registration, login } from '../controllers/auth';

const authRouter = express.Router();

authRouter.post('/registration', registration);
authRouter.post('/login', login);

export default authRouter;