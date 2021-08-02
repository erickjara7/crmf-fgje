const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SolicitudSchema = Schema({
    fecha:{type: Date},
    solicitante: {type: String},
    departamentosoli:{type: String},
    tipoSolicitud:{type: String, enum:['Requisición','Préstamo']},
    materialesSolicitados: Schema({
        nombrematerial: {type: String},
        unidadMedidaMate:{type:String, enum: ['Paquete','Pieza','Caja']},
        cantidadsolicitada:{type: Number}
    }),
    estado:{type: String, enum:['Iniciada','Pendiente','Entregada']}
});

module.exports = mongoose.model('Solicitud', SolicitudSchema)