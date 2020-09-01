/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('team', table => {
    table.increments('id').primary();
    table.string('name').notNullable();

    table.timestamp('created_at').defaultTo('now()');
    table.timestamp('updated_at').defaultTo('now()');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('team');
}
