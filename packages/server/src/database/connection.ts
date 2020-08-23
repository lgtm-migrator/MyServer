import knex from 'knex';
import knexConfig from '../../knexfileConnection';
let config: Object = {};

config = knexConfig[process.env.NODE_ENV];

const connection = knex(config);

export default connection;