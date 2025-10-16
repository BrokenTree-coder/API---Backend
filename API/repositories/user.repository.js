import db from '../database.js';

class UserRepository {
    /**
     * Encontra um usuário pelo seu ID.
     */
    static async findById(id) {
        await db.read();
        return db.data.users.find(u => u.id === id);
    }

    /**
     * Encontra um usuário pelo seu email.
     */
    static async findByEmail(email) {
        await db.read();
        return db.data.users.find(u => u.email === email);
    }

    /**
     * Retorna todos os usuários.
     */
    static async findAll() {
        await db.read();
        return db.data.users;
    }

    /**
     * Cria um novo usuário.
     */
    static async create(userData) {
        const proximoId = (db.data.users.length > 0 ? Math.max(...db.data.users.map(u => u.id)) : 0) + 1;
        
        const newUser = {
            id: proximoId,
            ...userData
        };

        db.data.users.push(newUser);
        await db.write();
        return newUser;
    }

    /**
     * Atualiza um usuário (PUT ou PATCH).
     */
    static async update(id, userData) {
        const index = db.data.users.findIndex(u => u.id === id);
        if (index === -1) {
            return null;
        }

        const userOriginal = db.data.users[index];
        const userAtualizado = { ...userOriginal, ...userData };

        db.data.users[index] = userAtualizado;
        await db.write();
        return userAtualizado;
    }

    /**
     * Remove um usuário.
     */
    static async remove(id) {
        const index = db.data.users.findIndex(u => u.id === id);
        if (index === -1) {
            return false;
        }
        db.data.users.splice(index, 1);
        await db.write();
        return true;
    }
}

export default UserRepository;