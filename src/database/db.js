import Sequelize from 'sequelize';

// dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql',
export const sequelize = new Sequelize('db_project', 'user_node', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    },
    logging: false
});

