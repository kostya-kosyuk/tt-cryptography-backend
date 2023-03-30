import express from 'express';

import authRouter from './routes/auth'

export default function createServer() {
    const app = express();

    app.use(express.json());

    app.use('/auth', authRouter);

    return app;
}