import express from 'express';
import authMiddleware from '../middlewares/auth';
import { messagePatchValidationRules, messagePostValidationRules } from '../middlewares/messageValidation';
import { createMessage, deleteMessage, getMessage, patchMessage } from '../controllers/message';

const messageRouter = express.Router();

messageRouter.use(authMiddleware);

messageRouter.post('/', messagePostValidationRules(),  createMessage);
messageRouter.get('/', authMiddleware, getMessage);
messageRouter.patch('/:id', authMiddleware, messagePatchValidationRules(), patchMessage);
messageRouter.delete('/:id', authMiddleware, deleteMessage);

export default messageRouter;