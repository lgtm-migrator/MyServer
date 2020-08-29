/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('team', table => {
    table.increments('id').primary();
    table.integer('name').notNullable();
    table.integer('plan').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('team');
}
