import PetService from '../services/pet.service.js';

class PetController {
    /**
     * Lida com a requisição de criação de pet.
     * Retirado da Aula 15, página 12. [cite: 308]
     */
    static async create(req, res, next) {
        try {
            // O corpo já foi validado pelo middleware. [cite: 309]
            const newPetDto = await PetService.create(req.body);
            res.status(201).json(newPetDto);
        } catch (error) {
            // Passa o erro para o middleware de erro global. [cite: 314]
            next(error);
        }
    }

    /**
     * Lida com a requisição de busca de pet por ID.
     * Retirado da Aula 15, página 23. [cite: 458]
     */
    static async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const petDto = await PetService.getById(id);
            res.status(200).json(petDto);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de listagem de todos os pets.
     * (Completado com base no padrão do documento)
     */
    static async getAll(req, res, next) {
        try {
            const petDtos = await PetService.getAll();
            res.status(200).json(petDtos);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de atualização de pet.
     * (Completado com base no padrão do documento)
     */
    static async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const petDto = await PetService.update(id, req.body);
            res.status(200).json(petDto);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de remoção de pet.
     * (Completado com base no padrão do documento)
     */
    static async remove(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await PetService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    /**
     * Lida com a requisição de atualização parcial de pet (PATCH).
     * (Adicionado para a funcionalidade PATCH)
     */
    static async patch(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const petDto = await PetService.partialUpdate(id, req.body);
            res.status(200).json(petDto);
        } catch (error) {
            next(error);
        }
    }
}

export default PetController;