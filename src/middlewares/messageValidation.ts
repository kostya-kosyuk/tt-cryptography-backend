import { check } from "express-validator";

const cipherKeyLengthLimit = {min: 1, max: 32};

export const messagePostValidationRules = () => {
    return [
        check('message')
            .notEmpty().withMessage('Message is required')
            .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters'),
        check('cipherMethod')
            .notEmpty().withMessage('Cipher method is required')
            .isIn(['caesar', 'xor']).withMessage('Invalid cipher method'),
        check('cipherKey')
            .notEmpty().withMessage('Cipher key is required')
            .custom(validateCipherKey),
    ];
};

export const messagePatchValidationRules = () => {
    return [
        check('message')
            .optional()
            .notEmpty().withMessage('Message is required')
            .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters'),
        check('cipherMethod')
            .optional()
            .notEmpty().withMessage('Cipher Method is required')
            .isIn(['caesar', 'xor']).withMessage('Invalid cipher method')
            .custom(validateCipherMethod),
        check('cipherKey')
            .optional()
            .notEmpty().withMessage('Cipher Key is required')
            .custom(validateCipherKey),
    ];
};

export const validateCipherMethod = (cipherMethod: string, {req}) => {
    const {cipherKey} = req.body;

    if (!cipherKey) {
        throw new Error('To change the cipher method, you need to specify the cipher key');
    }

    return true;
};

export const validateCipherKey = (cipherKey: string, { req }) => {
    const {cipherMethod} = req.body;

    if (!cipherMethod) {
        throw new Error('To change the cipher key, you need to specify the cipher method');
    };

    const { min, max } = cipherKeyLengthLimit;

    switch (cipherMethod) {
        case 'caesar':
            if (isNaN(Number(cipherKey))) {
                throw new Error('Cipher key must be a number');
            }

            const parsedValue = Number(cipherKey);

            if (parsedValue < min || parsedValue > max) {
                throw new Error(`Cipher key must be between ${min} and ${max} for Caesar cipher`);
            }

            return true;

            break;
        case 'xor':
            const length = cipherKey.length;

            if (length < min || length > max) {
                throw new Error(`Cipher key length must be between ${min} and ${max} for XOR cipher`);
            }

            return true;

            break;
        default:
            throw new Error('Unknown cipher method');
            break;
    }
};