
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema =  Schema({
    nombres:{type: String,required:true},
    apellidoP:{type: String,required:true},
    apellidoM:{type: String,required:true},
    username:{type: String,required:true,unique:true},
    password:{type: String,required:true},
    departamento:{type: String,required:true},
    userType:{type: String,required:true, enum: ['Administrador', 'Usuario']}
});

module.exports = mongoose.model('User', UserSchema)