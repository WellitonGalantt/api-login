import type { Knex } from "knex";
import { ETablesNames } from "../ETablesNames";

// -----Comandos para criar as tabelas com migrations ---------
//     "knex:migrate": "npx knex --knexfile src/knexfile.ts migrate:latest",
//     "knex:rollback": "npx knex --knexfile src/knexfile.ts migrate:rollback",
//     "knex:rollbackall": "npx knex --knexfile src/knexfile.ts migrate:rollback --all",
//     "knex:seed": "npx knex --knexfile src/knexfile.ts seed:run"

export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable(ETablesNames.USERS, (table) => {
        table.bigIncrements('id').primary().index();
        table.string('name').notNullable();
        table.string('email').index().notNullable().unique();
        table.string('password').notNullable();
    })
    .then(() => {
            console.log(`# Created table ${ETablesNames.USERS}`);
        })
    .catch((err) => {
        console.error('Erro ao criar a tabela:', err);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETablesNames.USERS)
    .then(() => {
            console.log(`# Dropped table ${ETablesNames.USERS}`);
        })
    .catch((err) => {
        console.error('Erro ao deletar a tabela:', err);
        });
}

