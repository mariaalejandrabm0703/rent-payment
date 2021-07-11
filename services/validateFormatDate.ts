import moment from "moment";

export default function validateFormatDate(fechaPago: string) {
  let newDate;
  if (fechaPago.includes("/")) {
    newDate = fechaPago.split("/");
    if (
      newDate.length === 3 &&
      newDate[2].length ===4 &&
      newDate[1].length ===2 &&
      newDate[0].length ===2 &&
      moment(newDate).isValid()
    ) {
      newDate = new Date(newDate[2] + "/" + newDate[1] + "/" + newDate[0]);
      return newDate;
    }
  }
  return false;
}
