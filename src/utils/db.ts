import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('test', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});