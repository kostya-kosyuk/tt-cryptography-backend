import express from 'express';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth'
import messageRouter from './routes/message'

export default function createServer() {
    const app = express();

    app.use(cookieParser());
    app.use(express.json());

    app.use('/auth', authRouter);
    app.use('/message', messageRouter);

    return app;
}