"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = validateFormatDate;
//# sourceMappingURL=validateFormatDate.js.map