import { check } from "express-validator";

const registrationValidationRules = () => {
    return [
        check('login')
            .notEmpty().withMessage('Email or Login is required')
            .isLength({ min: 6, max: 64 }).withMessage('Login must be between 6 and 64 characters')
            .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Login may only contain alphanumeric characters, dashes, and underscores'),
        check('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6, max: 32 }).withMessage('Password must be between 8 and 32 characters'),
    ]
};

export default registrationValidationRules;