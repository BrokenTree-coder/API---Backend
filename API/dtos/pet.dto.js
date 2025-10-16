/**
 * DTO para a resposta da entidade Pet.
 * Retirado da Aula 15, páginas 18 e 26. [cite: 374, 514]
 */
export class PetResponseDTO {
    constructor(pet) {
        this.id = pet.id;
        this.nome = pet.nome;
        this.especie = pet.especie;
        this.raca = pet.raca;
        // Note que outros campos internos poderiam ser omitidos aqui. [cite: 380, 520]
    }
}