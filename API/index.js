// 1. SINTAXE DE IMPORT ATUALIZADA
import express from 'express';
import petsRouter from './rotas/pets.router.js';
import usersRouter from './rotas/users.router.js';
import authRouter from './rotas/auth.router.js';
import authMiddleware from './middleware/auth.middleware.js';
import dotenv from 'dotenv';
import { globalErrorHandler } from './middleware/error.middleware.js';
import path from 'path'; // Módulo nativo do Node.js
import { fileURLToPath } from 'url'; // Para obter o __dirname em ES
import webRoutes from './rotas/web.router.js';

dotenv.config(); // Isso carrega as variáveis do arquivo .env

// Obter o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- CONFIGURAÇÃO DO PUG ---
// 1. Define o PUG como o motor de templates
app.set('view engine', 'pug');
// 2. Define o diretório onde os arquivos de template estão localizados
app.set('views', path.join(__dirname, 'views'));

// Middleware para permitir que o Express entenda JSON no corpo das requisições
app.use(express.json());

// Middleware de Logging (Nenhuma alteração necessária aqui)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Definição das rotas (Nenhuma alteração necessária aqui)
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', authMiddleware, petsRouter); // Rota de pets protegida
// Rotas da WEB (Páginas Renderizadas) [cite: 502]
app.use('/', webRoutes);

// Rota de Teste do pug
app.get('/hello-pug', (req, res) => {
    // res.render() é a função que renderiza um template
    // O primeiro argumento é o nome do arquivo na pasta 'views' (sem a extensão .pug)
    // O segundo argumento é um objeto com os dados que o template pode usar
    res.render('hello', {
    title: 'Página de Teste PUG',
    message: 'Olá, Mundo com PUG!'
    });
   });

// Middleware para rota não encontrada (Nenhuma alteração necessária aqui)
app.use((req, res, next) => {
    res.status(404).json({ mensagem: "A rota solicitada não existe." });
});

// Middleware Global de Tratamento de Erros. Deve ser o ÚLTIMO middleware a ser adicionado.
app.use(globalErrorHandler);

// Inicialização do servidor (Nenhuma alteração necessária aqui)
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
