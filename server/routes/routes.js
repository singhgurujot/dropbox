const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/files").post(userController.fileUpload).get(userController.getFiles);
router.route("/fileDelete/:id").delete(userController.deleteFiles);


module.exports = router;