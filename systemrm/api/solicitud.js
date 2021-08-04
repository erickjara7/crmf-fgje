const SoliController = require ('../controllers/solicitud');
const express = require('express');

const router = express.Router();

router.post("/add", SoliController.postSolicitud);
router.get("/getsoli", SoliController.getSolicitud);
router.get("/:_id", SoliController.getSolicitudId);
router.delete("/:_id", SoliController.deleteSolicitud);
router.put("/:_id", SoliController.putSolicitud);

module.exports = router;
