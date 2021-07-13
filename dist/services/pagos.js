"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPago = exports.validateFormatDate = void 0;
var moment_1 = __importDefault(require("moment"));
function validateFormatDate(fechaPago) {
    var newDate;
    var dateFormat = 'DD-MM-YYYY';
    if (fechaPago.includes("/")) {
        newDate = fechaPago.split("/");
        if (newDate.length === 3 &&
            newDate[2].length === 4 &&
            newDate[1].length === 2 &&
            newDate[0].length === 2) {
            newDate = new Date(newDate[2] + "/" + newDate[1] + "/" + newDate[0]);
            return moment_1.default(moment_1.default(newDate).format(dateFormat), dateFormat, true).isValid() ? newDate : false;
        }
    }
    return false;
}
exports.validateFormatDate = validateFormatDate;
function postPago(pago) {
    console.log('postPago', pago);
    //buscar por documento, mueble y mes/año el pago
    //validar si pago o no 1.000.000 completos
    // no pago = registrar pago y devolver cuanto le falta si es necesario.
    // si pago = 
    // ¿cuanto ya hay? y restar con 1.000.000 registrar 
    // pago si el valor es menor o igual a lo que falta
    // si es mayor, se devuelve error 
    return '';
}
exports.postPago = postPago;
//# sourceMappingURL=pagos.js.map