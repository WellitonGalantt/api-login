import { Knex } from "./knex";

async function testConnection() {
  try {
    await Knex.raw('SELECT 1+1 AS result');
    console.log('✅ Conexão bem-sucedida com o PostgreSQL!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', error);
  }
}

testConnection();

// npx ts-node ./src/database/testeConection.ts
