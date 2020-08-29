/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.enu('type', [1, 2, 3, 4, 5]).notNullable();
    table.string('name', 80).notNullable();
    table.string('email', 200).notNullable();
    table.string('password').notNullable();
    table.string('city').notNullable();
    table.string('uf').notNullable();
    table.timestamp('created').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user');
}
