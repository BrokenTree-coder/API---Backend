import { body, param } from 'express-validator';

// Validação usada para criar um pet. [cite: 263]
export const createPetValidation = [
    body('nome').notEmpty().withMessage('Nome é obrigatório.').isString().withMessage('Nome deve ser um texto.'),
    body('especie').notEmpty().withMessage('Espécie é obrigatória.').isString(),
    body('raca').notEmpty().withMessage('Raça é obrigatória.').isString()
];

// Validação para a rota que busca um pet pelo ID. [cite: 432]
export const getPetByIdValidation = [
    param('id').isInt({ min: 1 }).withMessage('O ID do pet deve ser um número inteiro positivo.')
];

// Validação usada para atualizar um pet. [cite: 263]
export const updatePetValidation = createPetValidation;

// Validação usada para atualizar um pet parcialmente (PATCH).
// Os campos são opcionais.
export const patchPetValidation = [
    body('nome').optional().isString().withMessage('Nome deve ser um texto.'),
    body('especie').optional().isString(),
    body('raca').optional().isString()
];