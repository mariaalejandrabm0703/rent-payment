"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPago = exports.validateFormatDate = void 0;
var moment_1 = __importDefault(require("moment"));
var pagos_1 = require("../models/pagos");
var Op = require("sequelize").Op;
/**
 * Valida el formato de fecha
 * @param fechaPago fecha recibida desde la petici??n
 * @returns false si es invalida ?? la fecha tipo Date si es correcta
 */
function validateFormatDate(fechaPago) {
    var newDate;
    var dateFormat = "DD-MM-YYYY";
    if (fechaPago.includes("/")) {
        newDate = fechaPago.split("/");
        if (newDate.length === 3 &&
            newDate[2].length === 4 &&
            newDate[1].length === 2 &&
            newDate[0].length === 2) {
            newDate = new Date(newDate[2] + "/" + newDate[1] + "/" + newDate[0]);
            return moment_1.default(moment_1.default(newDate).format(dateFormat), dateFormat, true).isValid()
                ? newDate
                : false;
        }
    }
    return false;
}
exports.validateFormatDate = validateFormatDate;
/**
 * Registra un pago de arriendo seg??n la fecha y el arrendatario.
 * @param pago informaci??n de la petici??n
 * @returns mensaje de respuesta
 */
function createPago(pago) {
    return __awaiter(this, void 0, void 0, function () {
        var mesg, startedDate, endDate, pays;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mesg = "";
                    startedDate = new Date(pago.fechaPago.getUTCFullYear() + "/" + (pago.fechaPago.getMonth() + 1) + "/01");
                    endDate = new Date(pago.fechaPago.getUTCFullYear() + "/" + (pago.fechaPago.getMonth() + 1) + "/31");
                    return [4 /*yield*/, pagos_1.Pago.findAll({
                            attributes: [
                                "documentoIdentificacionArrendatario",
                                "codigoInmueble",
                                "valorPagado",
                                "fechaPago",
                            ],
                            where: {
                                documentoIdentificacionArrendatario: pago.documentoIdentificacionArrendatario,
                                codigoInmueble: pago.codigoInmueble,
                                fechaPago: (_a = {}, _a[Op.between] = [startedDate, endDate], _a)
                            },
                        })
                            .then(function (payment) {
                            if (payment.length > 0) {
                                var pay = JSON.parse(JSON.stringify(payment))
                                    .map(function (payi) {
                                    return Number(payi.valorPagado);
                                })
                                    .reduce(function (accumulator, currentValue) {
                                    return accumulator + currentValue;
                                });
                                return pay;
                            }
                            return 0;
                        })
                            .catch(function () { return 0; })];
                case 1:
                    pays = _b.sent();
                    if (!(pays !== 0)) return [3 /*break*/, 6];
                    if (!(pays < 1000000 && pays + pago.valorPagado < 1000000)) return [3 /*break*/, 3];
                    return [4 /*yield*/, pagos_1.Pago.create(pago)
                            .then(function () {
                            return "gracias por tu abono, sin embargo recuerda que te hace falta pagar " + (1000000 - (pays + pago.valorPagado)) + " mes " + (pago.fechaPago.getMonth() + 1);
                        })
                            .catch(function () {
                            return "Hubo un error registrando el pago.";
                        })];
                case 2:
                    mesg = _b.sent();
                    _b.label = 3;
                case 3:
                    if (!(pays < 1000000 && pays + pago.valorPagado === 1000000)) return [3 /*break*/, 5];
                    return [4 /*yield*/, pagos_1.Pago.create(pago)
                            .then(function () {
                            return "gracias por pagar todo tu arriendo";
                        })
                            .catch(function () {
                            return "Hubo un error registrando el pago.";
                        })];
                case 4:
                    mesg = _b.sent();
                    _b.label = 5;
                case 5:
                    if (pays < 1000000 && pays + pago.valorPagado > 1000000) {
                        mesg = "El valor del arriendo es $1.000.000. No se ha registrado pago porque hay un abono de " + pays;
                    }
                    if (pays + pago.valorPagado > 1000000) {
                        mesg = "El valor del arriendo es $1.000.000. No se ha registrado pago porque hay un pago de " + pays;
                    }
                    return [3 /*break*/, 10];
                case 6:
                    if (!(pago.valorPagado === 1000000)) return [3 /*break*/, 8];
                    return [4 /*yield*/, pagos_1.Pago.create(pago)
                            .then(function () {
                            return "gracias por pagar todo tu arriendo";
                        })
                            .catch(function () {
                            return "Hubo un error registrando el pago.";
                        })];
                case 7:
                    mesg = _b.sent();
                    _b.label = 8;
                case 8:
                    if (!(pago.valorPagado < 1000000)) return [3 /*break*/, 10];
                    return [4 /*yield*/, pagos_1.Pago.create(pago)
                            .then(function () {
                            return "gracias por tu abono, sin embargo recuerda que te hace falta pagar " + (1000000 - pago.valorPagado) + " mes " + (pago.fechaPago.getMonth() + 1);
                        })
                            .catch(function () {
                            return "Hubo un error registrando el pago.";
                        })];
                case 9:
                    mesg = _b.sent();
                    _b.label = 10;
                case 10: return [2 /*return*/, mesg];
            }
        });
    });
}
exports.createPago = createPago;
//# sourceMappingURL=pagos.js.map