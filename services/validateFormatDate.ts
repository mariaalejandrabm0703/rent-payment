import moment from "moment";

export default function validateFormatDate(fechaPago: string) {
  
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
