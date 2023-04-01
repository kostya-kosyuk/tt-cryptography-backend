import { validationResult } from "express-validator";
import Message from "../models/massage";

export const createMessage = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Creating error', errors });
        }

        const userId = req.user.id;
        const { message, cipherMethod, cipherKey } = req.body;

        const newMessage = await Message.create({
            userId,
            message,
            cipherMethod,
            cipherKey
        });

        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMessage = async (req, res) => {
    try {
        const userId = req.user.id;

        const messages = await Message.findAll({ where: { userId } });

        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const patchMessage = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Updating error', errors });
        }

        const { id } = req.params;

        const foundMessage = await Message.findOne({ where: { id } });

        if (!foundMessage) {
            return res.status(404).send({ message: 'Message not found' });
        }

        const userId = req.user.id;

        if (!userId === foundMessage['userId']) {
            return res.status(403).send({ message: 'You are not the owner of this message'});
        }

        const { message, cipherMethod, cipherKey } = req.body;

        if (message) {
            foundMessage['message'] = message;
        }
        if (cipherMethod) {
            foundMessage['cipherMethod'] = cipherMethod;
        }
        if (cipherKey) {
            foundMessage['cipherKey'] = cipherKey;
        }

        await foundMessage.save();

        res.status(200).json({ foundMessage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const foundMessage = await Message.findOne({ where: { id }});

        if (!foundMessage) {
            return res.status(404).send({ message: 'Message not found' });
        }

        const userId = req.user.id;

        if (foundMessage['userId'] !== userId) {
            return res.status(403).send({ message: 'You are not the owner of this message' });
        }

        await foundMessage.destroy();

        res.status(200).send({ message: 'Message deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};