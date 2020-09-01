/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('reset_password', table => {
    table.increments('id').primary();
    table.integer('idUser').unsigned().notNullable();
    table.string('token').notNullable();
    table.string('code').notNullable();

    table.timestamp('created_at').defaultTo('now()');
    table.timestamp('updated_at').defaultTo('now()');

    table.foreign('idUser').references('id').inTable('user');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('reset_password');
}
