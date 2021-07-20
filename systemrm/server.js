const  express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Users = require("./api/users");

const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api/users", Users);


mongoose.connect(
    "mongodb://localhost/usuarios",
    //useUnifiedTopology:true, 
    {useUnifiedTopology:true, useNewUrlParser:true},
    (err, res) => {
        err && console.log("Error de conexión con la base de datos");
        app.listen(4000,() => {
            console.log("Servidor está corriendo en el puerto 4000");

        });
    }

);
    

