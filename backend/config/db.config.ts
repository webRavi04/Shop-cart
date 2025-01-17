import { Dialect } from 'sequelize';

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const development: DBConfig = {
  username: "postgres",
  password: "1234",
  database: "shopcart",
  host: "127.0.0.1",
  dialect: "postgres"
};

const test: DBConfig = {
  username: "root",
  password: "1234",
  database: "database_test",
  host: "127.0.0.1",
  dialect: "postgres"
};

const production: DBConfig = {
  username: "root",
  password: "1234",
  database: "database_production",
  host: "127.0.0.1",
  dialect: "postgres"
};

export default { development, test, production };