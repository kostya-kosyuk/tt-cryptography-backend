import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth'
import messageRouter from './routes/message'

export default function createServer() {
    const app = express();

    app.use(cors({
        origin: 'http://127.0.0.1:3000',
        credentials: true,
    }));
    app.use(cookieParser());
    app.use(express.json());

    app.use('/auth', authRouter);
    app.use('/message', messageRouter);

    return app;
}