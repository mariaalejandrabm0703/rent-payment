import {DataTypes} from 'sequelize';
import db from '../database/connection';

const Pago =  db.define('Pago',{ 
    documentoIdentificacionArrendatario:{
        type:DataTypes.INTEGER,
    },
    codigoInmueble:{
        type:DataTypes.STRING,
    },
    valorPagado:{
        type:DataTypes.STRING,
    },
    fechaPago:{
        type:DataTypes.DATE,
    },
})

export default Pago;