"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pagos_1 = require("../services/pagos");
describe("Test for services", function () {
    beforeAll(function () { return jest.setTimeout(90 * 1000); });
    test("ValidateFormatDate is valid", function () {
        var newDate = "05/05/2021";
        var res = pagos_1.validateFormatDate(newDate);
        expect(res).toEqual(new Date("05/05/2021"));
    });
    test("ValidateFormatDate is no valid", function () {
        var newDate = "2021-05/01";
        var res = pagos_1.validateFormatDate(newDate);
        expect(res).toEqual(false);
    });
});
//# sourceMappingURL=pagos.test.js.map