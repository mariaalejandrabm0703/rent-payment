import { Request, Response } from "express";
import moment from "moment";
import Pago from "../models/pagos";
import validateFormatDate from "../services/validateFormatDate";

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
  try {
    const { body } = req;

    let fechaPago = validateFormatDate(body.fechaPago);
    if (!fechaPago) {
      return res.status(400).json({
        msg: "Formato de fecha incorrecto",
      });
    }

    let pago = {
      documentoIdentificacionArrendatario:
        req.body.documentoIdentificacionArrendatario,
      codigoInmueble: body.codigoInmueble,
      valorPagado: body.valorPagado,
      fechaPago: fechaPago,
    };

    Pago.create(pago).then((pago) => {
      res.json({ respuesta: pago });
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors[0].message,
    });
  }
};
