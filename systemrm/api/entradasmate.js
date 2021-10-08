const EntradasMateController = require('../controllers/entradasmate');
const express = require('express');

const router = express.Router();

router.get("/get",EntradasMateController.getEntradasmate);
router.post("/add",EntradasMateController.postEntradasmate);
router.put("/:id",EntradasMateController.putEntradasmate);
router.delete("/:id",EntradasMateController.deleteEntradasmate);

module.exports = router;