const request = require("supertest");
const express = require("express");
const app = express();

import cors from "cors";
import pagosRoutes from "../routes/pagos";

app.use(express.urlencoded({ extended: false }));
app.use("/api/pagos", pagosRoutes);
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

describe("Test for constrollers", () => {
  beforeAll(() => jest.setTimeout(90 * 1000));

  test("GET pagos", (done) => {
    request(app)
      .get("/api/pagos")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  test("POST pagos", (done) => {
    request(app)
      .post("/api/pagos")
      .send({
        fechaPago: "21/02/2021",
        documentoIdentificacionArrendatario: 100475924,
        codigoInmueble: "8870",
        valorPagado: "1000000",
      })
      .then(() => {
        request(app)
          .get("/api/pagos")
          .expect("Content-Type", /json/)
          .expect(200, done);
      });
  });
});
