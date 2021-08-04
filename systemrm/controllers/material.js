const mongoose  = require('mongoose');
const Materiales = require('../models/Materiales');
//const User  = require('../models/Materiales');

const getMaterial =(req, res) =>{
    Materiales.find((err,material)=>{
        err && res.status(500).send(err.message);

        res.status(200).json(material);
    })
}



const getMaterialId =(req, res) =>{
    let _id = req.params._id;
    console.log(req.body);
    console.log(res);
    Materiales.findById(_id,(err,material)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion:${material}`})
        if (!material) return res.status(404).send({message:`El material no existe ${material}`})

        res.status(200).send({material})
    })  
}


const postMaterial = (req, res) =>{b 
    console.log(req.body);
    let material = new Materiales ()
        material.nombre = req.body.nombre,
        material.existencia = req.body.existencia,
        material.unidadMedida = req.body.unidadMedida,
        material.categoria = req.body.categoria

        material.save((err,materialstored) =>{
            if (err) res.status(500).send({message:`Error al salvar en la base de datos:${err}`})

            res.status(200).send({material: materialstored})
        })
}

const putMaterial = (req,res) => {
    let id = req.params.id;
    let update = req.body;

    Materiales.findByIdAndUpdate(id, update, (err, materialupdate) =>{
        if (err) res.status(500).send({mesage:`Error al actualizar el material: ${err}`})

        res.status(200).send({material: materialupdate})
    })
}


const deleteMaterial = (req,res) => {
    let id = req.params.id;
    Materiales.findById(id, (err, material) => {
        if (err) res.status(500).send({message:`Error al eliminar el Material ${err}`})

        material.remove(err =>{
            if (err) res.status(500).send({message:`Error al eliminar el Material ${err}`})

            res.status(200).send({message:'El Material se eliminó correctamente'})
        })
    })
}



module.exports = {getMaterial,getMaterialId,postMaterial,deleteMaterial, putMaterial};