import express from 'express';
import authMiddleware from '../middlewares/auth';
import { createMessage, deleteMessage, getMessage, patchMessage } from '../controllers/message';

const messageRouter = express.Router();

messageRouter.post('/', authMiddleware, createMessage);
messageRouter.get('/', authMiddleware, getMessage);
messageRouter.patch('/:id', authMiddleware, patchMessage);
messageRouter.delete('/:id', authMiddleware, deleteMessage);

export default messageRouter;