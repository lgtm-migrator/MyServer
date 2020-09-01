/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('team_user', table => {
    table.increments('id').primary();
    table.enu('type', [1, 2, 3, 4, 5]).notNullable();

    table.timestamp('created_at').defaultTo('now()');
    table.timestamp('updated_at').defaultTo('now()');

    table.integer('idTeam').unsigned().notNullable();
    table.foreign('idTeam').references('id').inTable('team');

    table.integer('idUser').unsigned().notNullable();
    table.foreign('idUser').references('id').inTable('user');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('team_user');
}
