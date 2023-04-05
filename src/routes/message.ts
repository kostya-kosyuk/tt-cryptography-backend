import express from 'express';
import authMiddleware from '../middlewares/auth';
import { messagePatchValidationRules, messagePostValidationRules } from '../middlewares/messageValidation';
import { createMessage, deleteMessage, getMessage, patchMessage } from '../controllers/message';

const messageRouter = express.Router();

messageRouter.use(authMiddleware);

messageRouter.post('/create', messagePostValidationRules(),  createMessage);
messageRouter.get('/get', authMiddleware, getMessage);
messageRouter.patch('/update/:id', authMiddleware, messagePatchValidationRules(), patchMessage);
messageRouter.delete('/delete/:id', authMiddleware, deleteMessage);

export default messageRouter;