"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var sequelize_1 = require("sequelize");
var connection_1 = __importDefault(require("../database/connection"));
var Pago = connection_1.default.define("Pago", {
    documentoIdentificacionArrendatario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo [documentoIdentificacionArrendatario] no puede ser nulo.",
            },
        },
    },
    codigoInmueble: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo [codigoInmueble] no puede ser nulo.",
            },
        },
    },
    valorPagado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo [valorPagado] no puede ser nulo.",
            },
        },
    },
    fechaPago: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo [fechaPago] no puede ser nulo.",
            },
        },
        get: function () {
            var time = this.getDataValue('fechaPago');
            if (moment_1.default(time, moment_1.default.ISO_8601, true).isValid()) {
                return moment_1.default(this.getDataValue('fechaPago')).format('DD/MM/YYYY');
            }
            else {
                return time;
            }
        }
    },
});
exports.default = Pago;
//# sourceMappingURL=pagos.js.map