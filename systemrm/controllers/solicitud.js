const mongoose = require('mongoose');
const Solicitud = require('../models/Solicitud');


const getSolicitud = (req, res)=>{
    Solicitud.find((err,solicitud)=>{
        err&&res.status(500).send(err.message);

        res.status(200).json(solicitud);
    })
}


const getSolicitudId = (req,res)=>{
    let _id = req.params._id;
    console.log(req.body);
    console.log(res);
    Solicitud.findById(_id,(err,solicitud)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion:${err}`})
        if (!solicitud) return res.status(404).send({message:`La solicitud no existe ${err}`})

        res.status(200).send({solicitud})

    })

}


const postSolicitud =(req,res)=>{
    console.log(req.body);
    let solicitud = new Solicitud()
        solicitud.fecha = req.body.fecha,
        solicitud.solicitante = req.body.solicitante,
        solicitud.departamentosoli = req.body.departamentosoli,
        solicitud.tipoSolicitud = req.body.tipoSolicitud,
        solicitud.materialesSolicitados.nombrematerial = req.body.nombrematerial,
        solicitud.materialesSolicitados.unidadMedidaMate = req.body.unidadMedidaMate,
        solicitud.materialesSolicitados.cantidadsolicitada = req.body.cantidadsolicitada,
        solicitud.estado = req.body.estado,

        solicitud.save((err,soliStored)=>{
            if(err) res.status(500).send({message:`Error al salvar en la base de datos:${err}`})

            res.status(200).send({solicitud: soliStored})

        })
}



const putSolicitud =(req,res)=>{
    let _id = req.params._id;
    let update = req.body;

    Solicitud.findByIdAndUpdate(_id, update, (err, soliUpdated)=>{
        if (err) res.status(500).send({mesage:`Error al actualizar la solicitud: ${err}`})
        
        res.status(200).send({solicitud: soliUpdated})

    })
}

const deleteSolicitud =(req,res) =>{
    let _id = req.params._id;

    Solicitud.findById(_id, (err, solicitud)=>{s
        if (err) res.status(500).send({message:`Error al eliminar la solicitud ${err}`})

        solicitud.remove(err=>{
            if (err) res.status(500).send({message: `Error al eliminar la solicitud ${err}`})

            res.status(200).send({message:'La solicitud se eliminó correctamente'})
        })
    })
}

module.exports = {getSolicitud, getSolicitudId, postSolicitud, putSolicitud, deleteSolicitud}


