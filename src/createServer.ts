import express from 'express';

import authRouter from './routes/auth'
import User from './models/user';

export default function createServer() {
    const app = express();

    app.use(express.json());

    app.use('/auth', authRouter);

    return app;
}