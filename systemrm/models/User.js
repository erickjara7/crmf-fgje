const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombres:{type: String},
    apellidoP:{type: String},
    apellidoM:{type: String},
    username:{type: String},
    password:{type: String},
    departamento:{type: String},
    userType:{type: String, enum: ['Administrador', 'Usuario']}
});

const User = mongoose.model('User', UserSchema)

export default User