import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config';

const environment = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';
const config = dbConfig[environment];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

export default sequelize;
