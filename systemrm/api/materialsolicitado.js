const MSController = require ('../controllers/materialsolicitado');
const express = require('express');

const router = express.Router();

router.post("/add",MSController.postMaterialSoli);
router.get("/getms",MSController.getMaterialSoli);
router.get("/:_id", MSController.getMaterialSoliId);
router.put("/:_id",MSController.putMaterialSoli);
router.delete("/:_id", MSController.deleteMaterialSoli);

module.exports = router;
