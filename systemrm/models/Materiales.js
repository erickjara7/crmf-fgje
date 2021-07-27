
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = Schema({
    nombre:{type: String},
    existencia:{type:Number},
    unidadMedida:{type:String, enum: ['Paquete','Pieza','Caja']},
    categoria:{type:String, enum:['Consumible', 'Limpieza','Embalaje','Reactivos y material químicos','Material de Id. Humana','Material de oficina','Tintas y toner']}

});

module.exports = mongoose.model('Materiales', MaterialSchema)