import { Request, Response } from "express";
import moment from "moment";
import Pago from "../models/pagos";

export const getPagos = async (req: Request, res: Response) => {
  const pagos = await Pago.findAll({
    attributes: [
      "documentoIdentificacionArrendatario",
      "codigoInmueble",
      "valorPagado",
      "fechaPago",
    ],
  });
  res.json(pagos);
};

export const postPagos = async (req: Request, res: Response) => {
  const { body } = req;

  let str = body.fechaPago.split("/");
  let date = new Date(str[2] + "/" + str[1] + "/" + str[0]);

  let pago = {
    documentoIdentificacionArrendatario:
      req.body.documentoIdentificacionArrendatario,
    codigoInmueble: body.codigoInmueble,
    valorPagado: body.valorPagado,
    fechaPago: date,
  };

  try {
    Pago.create(pago).then((pago) => {
      res.json({respuesta:pago});
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors[0].message,
    });
  }
};
