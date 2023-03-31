import { check, validationResult } from 'express-validator'
import User from '../models/user';

export const registration = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Registration error', errors });
        }

        const { login, password } = req.body;

        const user = await User.create({login, password});

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = (req, res) => {
    try {
        const { login, password } = req.body;

        res.json(`login: ${login}, ${password}`);
    } catch (error) {
        console.log(error);
    }
};