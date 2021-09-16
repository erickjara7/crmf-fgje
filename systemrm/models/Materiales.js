
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = Schema({
    nombre:{type: String,required:true,unique:true},
    existencia:{type:Number,required:true},
    unidadMedida:{type:String,required:true, enum: ['Paquete','Pieza','Caja']},
    categoria:{type:String,required:true, enum:['Consumible', 'Limpieza','Embalaje','Reactivos y material químicos','Material de Id. Humana','Material de oficina','Tintas y toner']}

});

module.exports = mongoose.model('Materiales', MaterialSchema)