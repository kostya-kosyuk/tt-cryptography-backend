import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth'
import messageRouter from './routes/message'

export default function createServer() {
    const app = express();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use((req, res, next) => {
        res.header('Content-Type', 'application/json;charset=UTF-8')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    });
    app.use(cookieParser());
    app.use(express.json());

    app.use('/auth', authRouter);
    app.use('/message', messageRouter);

    return app;
}