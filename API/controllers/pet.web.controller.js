import PetService from '../services/pet.service.js';

class PetWebController {
    /**
     * Busca todos os pets usando o PetService e renderiza a página PUG.
     */
    static async listPetsPage(req, res, next) {
        try {
            // 1. REUTILIZA A LÓGICA DE NEGÓCIO: Chama o mesmo serviço que a API usa.
            const pets = await PetService.getAll();

            // 2. RENDERIZA A VIEW: Chama res.render() para construir a página HTML.
            // O primeiro argumento é o nome do arquivo .pug na pasta 'views'[cite: 463].
            // O segundo é um objeto com os dados a serem enviados para o template[cite: 464].
            res.render('pets', {
                title: 'Lista de Pets',
                pets: pets // O array de pets será usado pelo 'each' no PUG
            });
        } catch (error) {
            next(error);
        }
    }
}

export default PetWebController;
