const mongoose = require ('mongoose');
const MaterialSolicitado = require('../models/MaterialSolicitado');


const getMaterialSoli = (req,res) =>{
    MaterialSolicitado.find((err,materialsolicitado)=>{
        err && res.status(500).send(err.message);

        res.status(200).json(materialsolicitado);
    })
}

const getMaterialSoliId = (req,res) =>{
    let _id = req.params._id;
    MaterialSolicitado.findById(_id,(err,materialsolicitado)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion:${err}`})
        if (!materialsolicitado) return res.status(404).send({message:`El pedido no existe ${err}`})

        res.status(200).send({materialsolicitado})
    })
}

const postMaterialSoli = (req,res) =>{
    console.log(req.body);
    let materialsolicitado = new MaterialSolicitado()
        materialsolicitado.idSolicitud = req.body.idSolicitud,
        materialsolicitado.idMaterial = req.body.idMaterial,
        materialsolicitado.nombreMaterial = req.body.nombreMaterial,
        materialsolicitado.unidadMedidaMS = req.body.unidadMedidaMS,
        materialsolicitado.cantidadsolicitada = req.body.cantidadsolicitada


        materialsolicitado.save((err,msStored)=>{
            if(err) res.status(500).send({message:`Error al salvar en la base de datos:${err}`})

            res.status(200).send({materialsolicitado: msStored})

        })
}

const putMaterialSoli = (req,res) =>{
    let _id = req.params._id;
    let update = req.body;

    MaterialSolicitado.findByIdAndUpdate(_id, update, (err, msUpdated)=>{
        if (err) res.status(500).send({mesage:`Error al actualizar el pedido: ${err}`})

        res.status(200).send({materialsolicitado: msUpdated})
    })
}

const deleteMaterialSoli = (req, res) =>{
    let _id = req.params._id;

    MaterialSolicitado.findById(_id,(err,materialsolicitado)=>{
        if (err) res.status(500).send({message:`Error al eliminar el pedido ${err}`})

        materialsolicitado.remove(err=>{
            if (err) res.status(500).send({message:`Error al eliminar el pedido ${err}`})
            res.status(200).send({message:'El pedido se eliminó correctamente'})
        })
    })

}

module.exports = {getMaterialSoli,getMaterialSoliId,postMaterialSoli,putMaterialSoli,deleteMaterialSoli};


