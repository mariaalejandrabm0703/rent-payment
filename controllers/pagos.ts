import { Request, Response } from "express";
import Pago from "../models/pagos";
import {validateFormatDate, postPago} from "../services/pagos";

export const getPagos = async (req: Request, res: Response) => {

  const pagos = await Pago.findAll({
    attributes: [
      "documentoIdentificacionArrendatario",
      "codigoInmueble",
      "valorPagado",
      "fechaPago",
    ],
  });
  res.status(200).json(pagos);
};

export const postPagos = async (req: Request, res: Response) => {
  try {     
    const { body } = req;
    let fechaPago = validateFormatDate(body.fechaPago);
    if (!fechaPago) {
      return res.status(400).json({
        msg: "Formato de fecha incorrecto.",
      });
    }
    let pago = {
      documentoIdentificacionArrendatario:
        req.body.documentoIdentificacionArrendatario,
      codigoInmueble: body.codigoInmueble,
      valorPagado: body.valorPagado,
      fechaPago: fechaPago,
    };

    let resp = postPago(pago)

    Pago.create(pago).then((pago) => {
      res.json({ respuesta: pago });
    }).catch(err => res.status(500).json({
      msg: err.errors[0].message,
    }))

  } catch (error) {
    res.status(500).json({
      msg: error.errors[0].message,
    });
  }
};
