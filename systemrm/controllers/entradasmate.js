const mongoose  = require('mongoose');
const EntradasMate = require('../models/EntradasMate');

const getEntradasmate =(req, res)=>{
    EntradasMate.find((err,entradasmate)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(entradasmate);
    })
}

const postEntradasmate = (req,res) =>{
    console.log(req.body);
    let entradasmate = new EntradasMate()
        entradasmate.nombreEM = req.body.nombreEM,
        entradasmate.cantidadaggEM = req.body.cantidadaggEM,
        entradasmate.unidadMedidaEM = req.body.unidadMedidaEM,
        entradasmate.categoriaEM = req.body.categoriaEM,
        entradasmate.marcamateEM = req.body.marcamateEM,
        entradasmate.caducidadmateEM = req.body.caducidadmateEM,
        entradasmate.tipomaterialEM = req.body.tipomaterialEM,
        entradasmate.loteEM = req.body.loteEM,
        entradasmate.fechaEM = req.body.fechaEM,
        entradasmate.usuarioEM = req.body.usuarioEM

        entradasmate.save((err,entmatestored)=>{
            if (err) res.status(500).send({message:`Error al salvar en la base de datos:${err}`})

            res.status(200).send({entradasmate: entmatestored})

        })
}


const putEntradasmate = (req,body) =>{
    let id = req.params.id;
    let update = req.body;

    EntradasMate.findByIdAndUpdate(id,update, (err, entmateupdate)=>{
        if (err) res.status(500).send({mesage:`Error al actualizar el material: ${err}`})

        res.status(200).send({entradasmate: entmateupdate})

    })

}


const deleteEntradasmate = (req,res) =>{
    let id = req.params.id;

    EntradasMate.findById(id,(err,entradasmate) =>{
        if (err) res.status(500).send({message:`Error al eliminar la entrada ${err}`})

        entradasmate.remove(err =>{
            if (err) res.status(500).send({message:`Error al eliminar el registro ${err}`})

            res.status(200).send({message:'El registro se eliminó correctamente'})
        })

    })

}

module.exports = {getEntradasmate,postEntradasmate,putEntradasmate,deleteEntradasmate};


