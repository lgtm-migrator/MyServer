import knex, { Config } from 'knex';
import knexConfig from '../../knexfileConnection';

const config: Config =
  knexConfig[process.env.NODE_ENV as 'dev' | 'test' | 'production'];

const connection = knex(config);

export default connection;
