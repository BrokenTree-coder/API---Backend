import PetRepository from '../repositories/pet.repository.js';
import { PetResponseDTO } from '../dtos/pet.dto.js';

class PetService {
    /**
     * Lógica de negócio para criar um pet.
     * Adaptado da Aula 15, página 14. [cite: 333]
     * A regra de negócio de "verificar dono" foi omitida pois não temos UserRepository ainda.
     */
    static async create(createPetData) {
        const newPetFromDb = await PetRepository.create(createPetData);
        // Formata a resposta usando o DTO. [cite: 342]
        return new PetResponseDTO(newPetFromDb);
    }

    /**
     * Lógica de negócio para buscar um pet pelo ID.
     * Retirado da Aula 15, página 24. [cite: 475]
     */
    static async getById(id) {
        const petFromDb = await PetRepository.findById(id);
        // REGRA DE NEGÓCIO: Se o pet não existir, lança um erro. [cite: 479]
        if (!petFromDb) {
            const error = new Error('Pet não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        // Aplica a transformação do DTO para formatar a resposta. [cite: 483, 486]
        return new PetResponseDTO(petFromDb);
    }

    /**
     * Lógica de negócio para listar todos os pets.
     * (Completado com base no padrão do documento)
     */
    static async getAll() {
        const petsFromDb = await PetRepository.findAll();
        // Mapeia cada pet para o formato do DTO
        return petsFromDb.map(pet => new PetResponseDTO(pet));
    }

    /**
     * Lógica de negócio para atualizar um pet.
     * (Completado com base no padrão do documento)
     */
    static async update(id, petData) {
        // REGRA DE NEGÓCIO: Verifica se o pet existe antes de tentar atualizar
        await this.getById(id); // Reutiliza a lógica do getById para a verificação
        const updatedPet = await PetRepository.update(id, petData);
        return new PetResponseDTO(updatedPet);
    }

    /**
     * Lógica de negócio para deletar um pet.
     * (Completado com base no padrão do documento)
     */
    static async remove(id) {
        // REGRA DE NEGÓCIO: Verifica se o pet existe antes de tentar deletar
        await this.getById(id); // Reutiliza a lógica do getById para a verificação
        return await PetRepository.remove(id);
    }

    /**
     * Lógica de negócio para atualizar um pet parcialmente.
     * (Adicionado para a funcionalidade PATCH)
     */
    static async partialUpdate(id, petData) {
        // REGRA DE NEGÓCIO: Verifica se o pet existe antes de tentar atualizar.
        // A chamada abaixo irá lançar um erro 404 se o pet não for encontrado.
        await this.getById(id);
        
        const updatedPet = await PetRepository.partialUpdate(id, petData);
        
        // Retorna o DTO do pet atualizado
        return new PetResponseDTO(updatedPet);
    }
}

export default PetService;