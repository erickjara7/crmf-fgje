const SoliController = require ('../controllers/solicitud');
const express = require('express');

const router = express.Router();

router.post("/add", SoliController.postSolicitud);
router.get("/getsoli", SoliController.getSolicitud);
router.get("/:id", SoliController.getSolicitudId);
router.delete("/:id", SoliController.deleteSolicitud);
router.put("/:id", SoliController.putSolicitud);

module.exports = router;
