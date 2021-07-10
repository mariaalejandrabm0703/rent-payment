"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_1 = __importDefault(require("../database/connection"));
var Pago = connection_1.default.define('Pago', {
    documentoIdentificacionArrendatario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    codigoInmueble: {
        type: sequelize_1.DataTypes.STRING,
    },
    valorPagado: {
        type: sequelize_1.DataTypes.STRING,
    },
    fechaPago: {
        type: sequelize_1.DataTypes.DATE,
    },
});
exports.default = Pago;
//# sourceMappingURL=pagos.js.map