

const  express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { useParams } = require("react-router-dom");
const { useReducer } = require("react");
const Users = require("./api/users");
const Materiales = require("./api/materiales");
const Solicitud = require ("./api/solicitud");
//const User = require('./models/User');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/users", Users);
app.use("/materiales", Materiales);
app.use("/solicitud", Solicitud);
//-------------------------------------------------------------
/*app.get('http://localhost:4000/api/users',(req,res)=>{
    User.find({},(err, users)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!users) return res.status(404).send({message:'No existen productos'})

        res.status(200).json(users);
       // res.send(200, {users})

    })

})

app.get('api/users/:userid',(req,res)=>{

})

app.post('http://localhost:4000/api/users',(req,res)=>{
    console.log('POST /api/users');
    console.log(req.body);

    let user = new User()
    user.nombres = req.body.nombres
    user.apellidoP= req.body.apellidoP
    user.apellidoM = req.body.apellidoM
    user.username = req.body.username
    user.password = req.body.password
    user.departamento = req.body.departamento
    user.userType = req.body.userType
    
    user.save((err,userStored)=>{
        if(err) res.status(500).send({message:`Error al salvar en la base de datos:${err}`})

        res.status(200).send({user: userStored})
    })


    
})

app.put('/api/users/:userid',(req,res)=>{
    
})
app.delete('/api/users/:userid',(req,res)=>{
    
})

/*mongoose.connect('mongodb://localhost/usuarios',{useUnifiedTopology:true, useNewUrlParser:true},(err,res) => {
    if (err) {
        return console.log(`Error al conectar la base de datos:${err}`)
    }
    console.log('Conexion con la base de datos establecida...')
    app.listen(port,() =>{
        console.log(`Api rest corriendo en http://localhost:${port}`)
    })
})*/
//---------------------------------------------------------------------

mongoose.connect(
    "mongodb://localhost/CRMF",
    //useUnifiedTopology:true, 
    {useUnifiedTopology:true, useNewUrlParser:true},
    (err, res) => {
        err && console.log("Error de conexión con la base de datos");
        app.listen(port,() => {
            //console.log("Servidor está corriendo en el puerto 4000");
            console.log(`Api rest corriendo en http://localhost:${port}`)

        });
    }

);
    

