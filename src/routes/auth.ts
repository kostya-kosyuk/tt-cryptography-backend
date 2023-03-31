import express from 'express';

import { check } from 'express-validator';

import { registration, login } from '../controllers/auth';

const authRouter = express.Router();

authRouter.post('/registration', [
    check('login')
        .notEmpty().withMessage('Email or Login is required')
        .isLength({ min: 6, max: 64 }).withMessage('Login must be between 6 and 64 characters')
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Login may only contain alphanumeric characters, dashes, and underscores'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 32 }).withMessage('Password must be between 8 and 32 characters'),
], registration);
authRouter.post('/login', [
    check('login')
        .notEmpty().withMessage('Email or Login is required'),
], login);

export default authRouter;