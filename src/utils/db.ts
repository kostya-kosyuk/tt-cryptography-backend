import { Sequelize } from 'sequelize';
import { dbConfig } from '../../db.config';

const {database, username, password, options} = dbConfig;

export const sequelize = new Sequelize(
    database,
    username,
    password,
    options,
);