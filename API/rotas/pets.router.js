import { Router } from 'express';
import PetController from '../controllers/pet.controller.js';
import { createPetValidation, getPetByIdValidation, updatePetValidation, patchPetValidation } from '../validators/pet.validator.js';
import { handleValidationErrors } from '../middleware/validation.middleware.js';

const petsRouter = Router();

// Rota POST /pets. [cite: 285]
petsRouter.post(
    '/',
    createPetValidation,
    handleValidationErrors,
    PetController.create
);

// Rota GET /pets/:id. [cite: 447]
petsRouter.get(
    '/:id',
    getPetByIdValidation,
    handleValidationErrors,
    PetController.getById
);

// Rota GET /pets
petsRouter.get('/', PetController.getAll);

// Rota PUT /pets/:id
petsRouter.put(
    '/:id',
    getPetByIdValidation, // Valida o ID
    updatePetValidation,  // Valida o corpo
    handleValidationErrors,
    PetController.update
);

// Rota DELETE /pets/:id
petsRouter.delete(
    '/:id',
    getPetByIdValidation,
    handleValidationErrors,
    PetController.remove
);

// Rota PATCH /pets/:id (Atualização Parcial)
petsRouter.patch(
    '/:id',
    getPetByIdValidation, // Valida o ID da URL
    patchPetValidation,   // Valida o corpo opcional
    handleValidationErrors,
    PetController.patch
);

export default petsRouter;