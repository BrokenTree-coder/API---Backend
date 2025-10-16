import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository.js';

class AuthService {
    /**
     * Lógica de negócio para autenticar um usuário.
     * @param {string} email O email do usuário.
     * @param {string} password A senha do usuário.
     * @returns {string} O token JWT gerado.
     */
    static async login(email, password) {
        // 1. Encontrar o usuário pelo email usando o repositório.
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            // Lança um erro de negócio se o usuário não for encontrado.
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401; // Unauthorized
            throw error;
        }

        // 2. Verificar se a senha (hasheada) está correta.
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401;
            throw error;
        }

        // 3. Se tudo estiver correto, gerar o Token JWT.
        const payload = {
            id: user.id,
            nome: user.nome,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        return token;
    }
}

export default AuthService;