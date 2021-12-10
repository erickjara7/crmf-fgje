

const  express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { useParams } = require("react-router-dom");
const { useReducer } = require("react");
const Users = require("./api/users");
const Materiales = require("./api/materiales");
const Solicitud = require ("./api/solicitud");
const MaterialSolicitado = require ("./api/materialsolicitado");
const EntradasMate = require('./api/entradasmate');
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
app.use("/materialsolicitado", MaterialSolicitado);
app.use("/entradasmate", EntradasMate);


mongoose.connect(
    "mongodb://localhost/CRMF",
    //useUnifiedTopology:true, 
    {useUnifiedTopology:true, useNewUrlParser:true},
    (err, res) => {
        err && console.log("Error de conexión con la base de datos");
        app.listen(port,() => {
            console.log(`Api rest corriendo en http://localhost:${port}`)

        });
    }

);
    

