// database/knex.ts → Conexão com o banco.
// Aqui faz apeans a  conexão com o banco de dados passando o arquivo de configuracao.

// Criar o migrations automaticamente
// npx knex --knexfile ./src/knexfile.ts migrate:make teste
// npx knex migrate:make create_users --knexfile src/knexfile.ts

import knex from 'knex';
import config from '../knexfile';

export const Knex = knex(config);