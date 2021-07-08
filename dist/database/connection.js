"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db = new sequelize_1.Sequelize('pruebaceiba', 'ceiba', 'ceiba', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map