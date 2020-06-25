import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

// validação do token JWT
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    // Definimos autenticação como Bearer token
    // 'Bearer h47411654.......'
    const [type, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        console.log(decoded);

        return next();
    } catch (error) {
        throw new Error('Invalid JWT token');
    }
}
