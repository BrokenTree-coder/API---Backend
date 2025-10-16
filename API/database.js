// 1. Importa as classes necessárias do lowdb.
//    - `Low`: A classe principal para criar uma instância do banco de dados.
//    - `JSONFile`: O adaptador que diz ao lowdb para usar um arquivo JSON como armazenamento.
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// 2. Define a estrutura de dados padrão para o nosso banco de dados.
//    Quando o arquivo `db.json` for criado pela primeira vez, ele terá este conteúdo.
const defaultData = {
  "users": [
    {
      "id": 1,
      "nome": "Admin User",
      "email": "admin@example.com",
      "password": "$2b$10$K8pFST5F7stTBLotTiEG.edL5IaTCq0IYe2zXFqmCwg8FJs0mfhUK",
      "role": "admin"
    }
  ],
  "pets": [
    {
      "id": 1,
      "nome": "soluço",
      "especie": "dragao",
      "raça": "nightwing"
    }
  ]
};

// 3. Cria o adaptador, especificando o nome do arquivo que será usado para o banco de dados.
const adapter = new JSONFile('db.json');

// 4. Cria a instância do banco de dados, passando o adaptador e os dados padrão.
const db = new Low(adapter, defaultData);

// 5. `db.read()`: Lê o conteúdo do arquivo `db.json`.
//    É importante chamar esta função uma vez no início para carregar os dados existentes na memória.
await db.read();

// 6. Exporta a instância do `db` para que possamos usá-la em outros arquivos (nossas rotas).
export default db;