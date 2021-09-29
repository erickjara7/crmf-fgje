const mongoose = require('mongoose');
const Schema = mongoose.Schema;


 
const SolicitudSchema = Schema({
    fecha:{type:Date,required:true},
    solicitante:{type:String,required:true},
    municipiosoli:{type:String,required:true},
    departamentosoli:{type:String,required:true},
    area:{type:String,required:true},
    tipoSolicitud:{type:String,required:true, enum: ['Requisición','Préstamo']},
    estado:{type:String,required:true, enum:['Iniciada','Pendiente','Entregada','Obsolet']}
});

module.exports = mongoose.model('Solicitud', SolicitudSchema)






/*const SolicitudSchema = Schema({
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

module.exports = mongoose.model('Solicitud', SolicitudSchema)*/