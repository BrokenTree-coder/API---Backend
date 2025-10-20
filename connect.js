import 'dotenv/config';
// 1. Importa a classe MongoClient do driver do MongoDB
import { MongoClient } from 'mongodb';

// 2. Pega a nossa string de conexão do arquivo .env
const uri = process.env.MONGO_URI;

// 3. Cria uma nova instância do MongoClient, passando a URI
//    Isso prepara a conexão, mas ainda não conecta de fato.
const client = new MongoClient(uri);

// 4. Cria uma função principal assíncrona para podermos usar await
async function run() {
  try {
    // 5. Conecta o cliente ao servidor. Await pausa a execução até a conexão ser estabelecida.
    await client.connect();
    console.log("Conectado com sucesso ao MongoDB Atlas!");

    // 6. Especifica o banco de dados e a collection que queremos usar.
    //    Se 'petshop' ou 'pets' não existirem, eles serão criados na primeira inserção.
    const database = client.db('pets');
    const petsCollection = database.collection('pets2');

    // --- OPERAÇÕES BÁSICAS ---

    // 7. Inserir um documento
    const novoPet = { nome: "Fumaça", especie: "gato", raca: "SRD" };
    const result = await petsCollection.insertOne(novoPet);
    console.log(`Um novo pet foi inserido com o ID: ${result.insertedId}`);

    // 8. Buscar todos os documentos
    console.log("Buscando todos os pets...");
    // A função find() retorna um "cursor", que é um ponteiro para os resultados.
    // Usamos toArray() para trazer todos os documentos para a memória.
    const pets = await petsCollection.find({}).toArray();
    console.log(pets);

  } catch (error) {
    // Captura qualquer erro que possa ocorrer durante o processo
    console.error("Falha ao conectar ou operar no MongoDB", error);
  } finally {
    // 9. O bloco 'finally' SEMPRE será executado, seja com sucesso ou com erro.
    //    É o lugar perfeito para garantir que a conexão com o banco de dados seja fechada.
    await client.close();
    console.log("Conexão com o MongoDB fechada.");
  }
}

// 10. Executa a nossa função principal
run();