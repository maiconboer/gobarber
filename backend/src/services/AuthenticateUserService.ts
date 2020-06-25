import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        // user.password - senha criptografada
        // password - senha NÃO criptografada

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        // se chegou até aqui - usuário está autenticado
        const token = sign({}, 'ed7aa2a8926e0a497896214ae71f3eb0', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
