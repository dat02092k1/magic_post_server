const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const verifyMiddileware = require("../../middleware/verify");
const { aclMiddleware } = require("../../middleware/aclMiddleware");
const validateFieldsMiddleware = require("../../middleware/validation");
var upload = require('../../helpers/upload').upload;

router.post(
  "/user",
  verifyMiddileware.verifyToken,
  // aclMiddleware,
  upload.single('image'),
  userController.create
);
router.get("/user/:id", userController.getDetail);
router.put("/user/:id", upload.single('image'), userController.editDetail);
router.delete("/user/:id", userController.delete);
router.get("/users", userController.getByCondition);
router.post("/users/import", upload.single('file'), validateFieldsMiddleware, userController.importUsers);

module.exports = router;
