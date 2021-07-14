import moment from "moment";
import { Pago, IPay } from "../models/pagos";

export function validateFormatDate(fechaPago: string) {
  let newDate;
  let dateFormat = "DD-MM-YYYY";
  if (fechaPago.includes("/")) {
    newDate = fechaPago.split("/");
    if (
      newDate.length === 3 &&
      newDate[2].length === 4 &&
      newDate[1].length === 2 &&
      newDate[0].length === 2
    ) {
      newDate = new Date(newDate[2] + "/" + newDate[1] + "/" + newDate[0]);
      return moment(
        moment(newDate).format(dateFormat),
        dateFormat,
        true
      ).isValid()
        ? newDate
        : false;
    }
  }
  return false;
}

export async function createPago(pago: IPay) {
  let mesg: string = "";

  let pays = await Pago.findAll({
    attributes: [
      "documentoIdentificacionArrendatario",
      "codigoInmueble",
      "valorPagado",
      "fechaPago",
    ],
    where: {
      documentoIdentificacionArrendatario:
        pago.documentoIdentificacionArrendatario,
      codigoInmueble: pago.codigoInmueble,
    },
  })
    .then((payment) => {
      if (payment.length > 0) {
        let pay = JSON.parse(JSON.stringify(payment))
          .map((payi: any) => {
            return Number(payi.valorPagado);
          })
          .reduce(
            (accumulator: number, currentValue: number) =>
              accumulator + currentValue
          );
        return pay;
      }
      return 0;
    })
    .catch(() => 0);

  if (pays !== 0) {
    if (pays < 1000000 && pays + pago.valorPagado < 1000000) {
      mesg = await Pago.create(pago)
        .then(() => {
          return `gracias por tu abono, sin embargo recuerda que te hace falta pagar ${
            1000000 - (pays + pago.valorPagado)
          }`;
        })
        .catch(() => {
          return "Hubo un error registrando el pago.";
        });
    }
    if (pays < 1000000 && pays + pago.valorPagado === 1000000) {
      mesg = await Pago.create(pago)
        .then(() => {
          return "gracias por pagar todo tu arriendo";
        })
        .catch(() => {
          return "Hubo un error registrando el pago.";
        });
    }
    if (pays < 1000000 && pays + pago.valorPagado > 1000000) {
      mesg = `El valor del arriendo es $1.000.000. No se ha registrado pago porque hay un abono de ${pays}`;
    }
    if (pays + pago.valorPagado > 1000000) {
      mesg = `El valor del arriendo es $1.000.000. No se ha registrado pago porque hay un pago de ${pays}`;
    }
  } else {
    if (pago.valorPagado === 1000000) {
      mesg = await Pago.create(pago)
        .then(() => {
          return "gracias por pagar todo tu arriendo";
        })
        .catch(() => {
          return "Hubo un error registrando el pago.";
        });
    }
    if (pago.valorPagado < 1000000) {
      mesg = await Pago.create(pago)
        .then(() => {
          return `gracias por tu abono, sin embargo recuerda que te hace falta pagar ${
            1000000 - pago.valorPagado
          }`;
        })
        .catch(() => {
          return "Hubo un error registrando el pago.";
        });
    }
  }
  return mesg;
}
