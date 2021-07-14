"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pago = void 0;
var moment_1 = __importDefault(require("moment"));
var sequelize_1 = require("sequelize");
var connection_1 = __importDefault(require("../database/connection"));
exports.Pago = connection_1.default.define("Pago", {
    documentoIdentificacionArrendatario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo [documentoIdentificacionArrendatario] no puede ser nulo.",
            },
            isNumeric: {
                msg: "El campo [documentoIdentificacionArrendatario] debe ser un número.",
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
            isAlphanumeric: {
                msg: "El campo [codigoInmueble] debe ser un número.",
            },
        },
    },
    valorPagado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo [valorPagado] no puede ser nulo.",
            },
            min: {
                args: [1],
                msg: "El campo [valorPagado] debe tener mínimo valor 1.",
            },
            max: {
                args: [1000000],
                msg: "El campo [valorPagado] debe tener máximo valor 1.000.000.",
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
            var time = this.getDataValue("fechaPago");
            if (moment_1.default(time, moment_1.default.ISO_8601, true).isValid()) {
                return moment_1.default(this.getDataValue("fechaPago")).format("DD/MM/YYYY");
            }
            else {
                return time;
            }
        },
    },
});
exports.Pago.sync().then(function () {
    console.log("table Pago update");
});
//# sourceMappingURL=pagos.js.map