
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSolicitadoSchema = Schema({
    idSolicitud: {type: String,required:true},
    idMaterial:{type: String,required:true},
    nombreMaterial: {type: String,required:true},
    unidadMedidaMS: {type: String,required:true, enum:['Pieza','Paquete','Caja']},
    cantidadsolicitada: {type: Number,required:true}
});

module.exports = mongoose.model('MaterialSolicitado', MaterialSolicitadoSchema)