import { Request, Response } from "express";
import Pago from "../models/pagos";

export const getPagos = async (req: Request, res: Response) => {
  const pagos = await Pago.findAll();
  res.json({ pagos });
};

export const postPagos = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const pago = Pago.build(body);
    await pago.save();
    res.json(pago);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ha ocurrido un error, comuniquese con el administrador del sistema.",
    });
  }
};
