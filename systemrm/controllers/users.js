const mongoose  = require('mongoose');
const User  = require('../models/User');

const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.getUser = (req, res) => {
    User.find((err, users) =>{
        err && res.status(500).send(err.message);

        res.status(200).json(users);
    })
}

const getUserId =(req, res) =>{
    User.findById(req.params.id, (err, user)=>{
        err && res.status(500).send(err.message);

        res.status(200).json(user);
    })
}


  
app.postUser = (req, res) =>{
    console.log(req.body);
    let user = new User()
        user.nombres = req.body.nombres,
        user.apellidoP= req.body.apellidoP,
        user.apellidoM = req.body.apellidoM,
        user.username = req.body.username,
        user.password = req.body.password,
        user.departamento = req.body.departamento,
        user.userType = req.body.userType
}
user.save((err, usrstored) =>{
    err && res.status(500).sed(err.message);

    res.status(200).send({user: usrstored.req.body})
    //res.status(200).json(usrstored);
})
module.exports = {getUser, getUserId, postUser};