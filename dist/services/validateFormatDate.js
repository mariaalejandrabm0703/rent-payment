"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateFormatDate(fechaPago) {
    console.log(fechaPago);
    var newDate;
    if (fechaPago.includes("/")) {
        newDate = fechaPago.split("/");
        if (newDate.length === 3 &&
            newDate[2].length === 2 &&
            newDate[1].length === 2 &&
            newDate[0].length === 2) {
            newDate = new Date(newDate[2] + "/" + newDate[1] + "/" + newDate[0]);
            return newDate;
        }
    }
    return false;
}
exports.default = validateFormatDate;
//# sourceMappingURL=validateFormatDate.js.map