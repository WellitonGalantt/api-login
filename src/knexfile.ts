// knexfile.ts → Configuração do banco de dados.
// Apenas a configuracao de conexao com banco de dados
import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '123',
        database: 'users_test',
    },
    pool: { min: 2, max: 10 }, // Configuração da pool de conexões
    migrations: {
        tableName: 'knex_migrations',
        directory: './database/migrations'
    },
    seeds: {
        directory: './src/database/seeds',
    }
}

export default config;