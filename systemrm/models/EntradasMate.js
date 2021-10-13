const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntradasSchema = Schema({
    idmaterialEM:{type: String,required:true},
    nombreEM:{type: String,required:true},
    cantidadaggEM:{type:Number,required:true},
    unidadMedidaEM:{type:String,required:true, enum: ['Paquete','Pieza','Caja']},
    categoriaEM:{type:String,required:true, enum:['Consumible', 'Limpieza','Embalaje','Reactivos y material químicos','Material de Id. Humana','Material de oficina','Tintas y toner']},
    marcamateEM:{type:String,required:true},
    caducidadmateEM:{type:String},
    tipomaterialEM:{type:String,required:true},
    loteEM:{type:String,required:true},

    fechaEM:{type:Date,required:true},
    usuarioEM:{type: String,required:true}
    


});

module.exports = mongoose.model('EntradasMate', EntradasSchema)