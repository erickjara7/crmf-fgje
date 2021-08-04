const MaterialController = require ('../controllers/material');
const express = require('express');


const router = express.Router();

router.post("/add",MaterialController.postMaterial);
router.get("/getmaterial", MaterialController.getMaterial);
//router.get("/:_id", MaterialController.getMaterialId);
router.delete("/:id", MaterialController.deleteMaterial);
router.put("/:id", MaterialController.putMaterial);

module.exports = router;