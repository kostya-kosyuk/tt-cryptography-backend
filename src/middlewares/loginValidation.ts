import { check } from "express-validator";

const loginValidationRules = () => {
    return [
        check('login')
            .notEmpty().withMessage('Email or Login is required'),
    ]
};

export default loginValidationRules;