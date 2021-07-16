"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("supertest");
var express = require("express");
var app = express();
var cors_1 = __importDefault(require("cors"));
var pagos_1 = __importDefault(require("../routes/pagos"));
app.use(express.urlencoded({ extended: false }));
app.use("/api/pagos", pagos_1.default);
app.use(cors_1.default());
app.use(express.json());
app.use(express.static("public"));
describe("Test for constrollers", function () {
    beforeAll(function () { return jest.setTimeout(90 * 1000); });
    test("GET pagos", function (done) {
        request(app)
            .get("/api/pagos")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
    test("POST pagos", function (done) {
        request(app)
            .post("/api/pagos")
            .send({
            fechaPago: "21/02/2021",
            documentoIdentificacionArrendatario: 100475924,
            codigoInmueble: "8870",
            valorPagado: "1000000",
        })
            .then(function () {
            request(app)
                .get("/api/pagos")
                .expect("Content-Type", /json/)
                .expect(200, done);
        });
    });
});
//# sourceMappingURL=pago.test.js.map