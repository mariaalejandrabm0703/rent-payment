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
    },
  },
  codigoInmueble: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo [codigoInmueble] no puede ser nulo.",
      },
    },
  },
  valorPagado: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo [valorPagado] no puede ser nulo.",
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
