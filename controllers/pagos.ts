import { Request, Response } from "express";
import {Pago, IPay } from "../models/pagos";
import {validateFormatDate, createPago} from "../services/pagos";

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
    let pago: IPay = {
      documentoIdentificacionArrendatario:
        req.body.documentoIdentificacionArrendatario,
      codigoInmueble: body.codigoInmueble,
      valorPagado: body.valorPagado,
      fechaPago: fechaPago,
    };

    let resp = await createPago(pago)
  
    res.status(200).json(resp)

  } catch (error) {
    res.status(500).json({
      msg: error.errors[0].message,
    });
  }
};
