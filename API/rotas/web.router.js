import { Router } from 'express';
import PetWebController from '../controllers/pet.web.controller.js';

const webRouter = Router();

// Define a rota GET /pets-view e a conecta ao método do nosso web controller [cite: 492]
webRouter.get('/pets-view', PetWebController.listPetsPage);

export default webRouter;
