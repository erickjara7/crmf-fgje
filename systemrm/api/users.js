const UserController = require ('../controllers/users');
const express = require('express');

const router = express.Router();


router.post("/add", UserController.postUser);
router.get("/getuser", UserController.getUser);
router.get("/:id", UserController.getUserId);
router.delete("/:id", UserController.deleteUser);

module.exports = router;