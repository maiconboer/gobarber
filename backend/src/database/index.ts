import { createConnection } from 'typeorm';

// createConnection() procura no projeto um arquivo chamado
// ormconfig.json , ler os dados deste arquivo e fazer a conexão com DB
createConnection();
