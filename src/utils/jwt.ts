import { sign } from 'jsonwebtoken';
import { secretKey } from '../../jwt.config';

export const generateToken = (id) => {
    const payload = { id };

    return sign(payload, secretKey, { expiresIn: '24h'} );
};