import knex from 'knex';
const config = require('../../knexfile');

const connection = knex(config.dev);
export interface ProcessList {
		id: number;
		idProcess: string;
		name: string;
		nodeVersion: string;
		versioning: string;
		version: string;
		unstableRestarts: string;
        status: string;
}


export default connection;