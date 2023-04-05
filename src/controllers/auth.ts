import { validationResult } from 'express-validator'
import User from '../models/user';
import { hash, compare } from 'bcrypt';
import { generateToken } from '../utils/jwt';

const attachCookies = (id: number, login: string, res) => {
    const token = generateToken(id);

    res.cookie('token', token, {
        sameSite: 'none',
        secure: true,
        maxAge: 36000 * 1000,
    });

    res.cookie('login', login, {
        sameSite: 'none',
        secure: true,
        maxAge: 36000 * 1000,
    })
}

export const registration = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Registration error', errors });
        }

        const { login, password } = req.body;

        const userWithSameLogin = await User.findOne({ where: { login } });

        if (userWithSameLogin) {
            return res.status(400).json({ message: 'User with such login already exists'});
        }

        const hashPassword = await hash(password, 5);

        const user = await User.create({
            login,
            password: hashPassword
        });

        attachCookies(user['id'], user['login'], res);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { login, password } = req.body;


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Registration error', errors });
        }

        const user = await User.findOne({ where: { login }});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await compare(password, user['password']);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        attachCookies(user['id'], user['login'], res);

        res.status(200).json('Login successful');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            sameSite: 'none',
            secure: true,
        });
        res.clearCookie('login', {
            sameSite: 'none',
            secure: true,
        });
        res.status(200).json('Successfully logged out');

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};