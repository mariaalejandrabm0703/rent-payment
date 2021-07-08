import {Sequelize} from 'sequelize';

const db = new Sequelize('pruebaceiba', 'ceiba', 'ceiba', {
    host:'localhost',
    dialect:'mysql',
    logging:false
});

export default db;