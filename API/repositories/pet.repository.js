import db from '../database.js';

class PetRepository {
    /**
     * Cria um novo pet no banco de dados.
     * Retirado da Aula 15, página 16. [cite: 357]
     */
    static async create(petData) {
        // A lógica de ID foi adaptada para o nosso lowdb sem UUID
        const proximoId = (db.data.pets.length > 0 ? Math.max(...db.data.pets.map(p => p.id)) : 0) + 1;

        const newPet = {
            id: proximoId,
            nome: petData.nome,
            especie: petData.especie,
            raca: petData.raca,
        };
        db.data.pets.push(newPet);
        await db.write();
        return newPet;
    }

    /**
     * Encontra um pet pelo seu ID.
     * Retirado da Aula 15, página 25. [cite: 502]
     */
    static async findById(id) {
        await db.read();
        return db.data.pets.find(p => p.id === id);
    }

    /**
     * Retorna todos os pets.
     * (Completado com base no padrão do documento)
     */
    static async findAll() {
        await db.read();
        return db.data.pets;
    }

    /**
     * Atualiza um pet.
     * (Completado com base no padrão do documento)
     */
    static async update(id, petData) {
        const index = db.data.pets.findIndex(p => p.id === id);
        if (index === -1) {
            return null;
        }
        const petAtualizado = { id, ...petData };
        db.data.pets[index] = petAtualizado;
        await db.write();
        return petAtualizado;
    }

    /**
     * Remove um pet.
     * (Completado com base no padrão do documento)
     */
    static async remove(id) {
        const index = db.data.pets.findIndex(p => p.id === id);
        if (index === -1) {
            return false;
        }
        db.data.pets.splice(index, 1);
        await db.write();
        return true;
    }

    /**
     * Atualiza um pet parcialmente.
     * (Adicionado para a funcionalidade PATCH)
     */
    static async partialUpdate(id, petData) {
        const index = db.data.pets.findIndex(p => p.id === id);
        if (index === -1) {
            return null;
        }

        const petOriginal = db.data.pets[index];
        // Mescla os dados originais com os novos dados recebidos
        const petAtualizado = { ...petOriginal, ...petData };
        
        db.data.pets[index] = petAtualizado;
        await db.write();
        return petAtualizado;
    }
}

export default PetRepository;