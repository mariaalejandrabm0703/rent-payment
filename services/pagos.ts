import moment from "moment";
import Pago from "../models/pagos";

export function validateFormatDate(fechaPago: string) {
  
  let newDate;
  let dateFormat = 'DD-MM-YYYY';
  if (fechaPago.includes("/")) {
    newDate = fechaPago.split("/");
    if (
      newDate.length === 3 &&
      newDate[2].length ===4 &&
      newDate[1].length ===2 &&
      newDate[0].length ===2       
    ) {
      newDate = new Date(newDate[2] + "/" + newDate[1] + "/" + newDate[0]);
      return moment(moment(newDate).format(dateFormat),dateFormat,true).isValid() ? newDate: false
    }
  }
  return false;
}

interface iPago{
    documentoIdentificacionArrendatario: number,
    codigoInmueble: string,
    valorPagado: number,
    fechaPago: Date
}

export function postPago(pago:iPago){
    console.log('postPago',pago)
//buscar por documento, mueble y mes/año el pago
  //validar si pago o no 1.000.000 completos
  // no pago = registrar pago y devolver cuanto le falta si es necesario.
  // si pago = 
    // ¿cuanto ya hay? y restar con 1.000.000 registrar 
    // pago si el valor es menor o igual a lo que falta
    // si es mayor, se devuelve error 
    return ''
}