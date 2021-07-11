"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
function validateFormatDate(fechaPago) {
    var newDate;
    if (fechaPago.includes("/")) {
        newDate = fechaPago.split("/");
        if (newDate.length === 3 &&
            newDate[2].length === 4 &&
            newDate[1].length === 2 &&
            newDate[0].length === 2 &&
            moment_1.default(newDate).isValid()) {
            newDate = new Date(newDate[2] + "/" + newDate[1] + "/" + newDate[0]);
            return newDate;
        }
    }
    return false;
}
exports.default = validateFormatDate;
//# sourceMappingURL=validateFormatDate.js.map