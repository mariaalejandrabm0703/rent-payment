import { Request, Response } from "express";
import { Pago, IPay } from "../models/pagos";
import { validateFormatDate, createPago } from "../services/pagos";

/**
 * 
 * @param req 
 * @param res 
 */
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

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const postPagos = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    
    //Valida formato de fecha
    let fechaPago = validateFormatDate(body.fechaPago);
    if (!fechaPago) {
      return res.status(400).json({
        msg: "Formato de fecha incorrecto.",
      });
    }

    // Valida fecha impar
    if(fechaPago.getDate()%2 === 0){
      return res.status(400).json({
        msg: "Lo siento pero no se puede recibir el pago por decreto de administración.",
      });
    }

    //Crea el pago
    let pago: IPay = {
      documentoIdentificacionArrendatario:
        req.body.documentoIdentificacionArrendatario,
      codigoInmueble: body.codigoInmueble,
      valorPagado: body.valorPagado,
      fechaPago: fechaPago,
    };

    // Registra el pago
    let resp = await createPago(pago);

    res.status(200).json({ respuesta: resp });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
