
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSolicitadoSchema = Schema({
    idSolicitud: {type: String},
    idMaterial:{type: String},
    nombreMaterial: {type: String},
    unidadMedidaMS: {type: String, enum:['Pieza','Paquete','Caja']},
    cantidadsolicitada: {type: Number}
});

module.exports = mongoose.model('MaterialSolicitado', MaterialSolicitadoSchema)