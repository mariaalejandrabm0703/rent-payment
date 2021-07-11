import moment from "moment";
import { DataTypes } from "sequelize";
import db from "../database/connection";

const Pago = db.define("Pago", {
  documentoIdentificacionArrendatario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo [documentoIdentificacionArrendatario] no puede ser nulo.",
      },
      isNumeric: {
        msg:'El campo [documentoIdentificacionArrendatario] debe ser un número.'
      }
    },
  },
  codigoInmueble: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo [codigoInmueble] no puede ser nulo.",
      }, 
      isAlphanumeric:{
        msg:'El campo [codigoInmueble] debe ser un número.'
      }
    },
  },
  valorPagado: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo [valorPagado] no puede ser nulo.",
      },
      min: {
        args:[1],
        msg:'El campo [valorPagado] debe tener mínimo valor 1.'
      },
      max:{
        args:[1000000],
        msg:'El campo [valorPagado] debe tener máximo valor 1.000.000.'
      },
    },
  },
  fechaPago: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo [fechaPago] no puede ser nulo.",
      },
    },
    get: function() {
        let time = this.getDataValue('fechaPago')
        if (moment(time, moment.ISO_8601, true).isValid()) {
            return moment(this.getDataValue('fechaPago')).format('DD/MM/YYYY')
        } else {
            return time
        }
    }
  },
});

export default Pago;
