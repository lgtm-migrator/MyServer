import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('processList', table => {
		table.increments('id').primary();
		table.integer('idProcess').notNullable();
		table.string('name').notNullable();
		table.string('nodeVersion');
		table.string('versioning');
		table.string('version');
		table.string('unstableRestarts');
        table.string('status');
    });
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('processList');
}

