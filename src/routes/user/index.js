const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const verifyMiddileware = require("../../middleware/verify");
const validateFieldsMiddleware = require("../../middleware/validation");
var upload = require('../../helpers/upload').upload;

router.post(
  "/user",
  verifyMiddileware.isHeadDepartment,
  // aclMiddleware,
  upload.single('image'),
  userController.create
);
router.get("/user/:id", verifyMiddileware.isHeadDepartment, userController.getDetail);
router.put("/user/:id", upload.single('image'), verifyMiddileware.isHeadDepartment, userController.editDetail);
router.delete("/user/:id", verifyMiddileware.isAdmin, userController.delete);
router.get("/users", verifyMiddileware.isHeadDepartment, userController.getByCondition);
router.post("/users/import", upload.single('file'), verifyMiddileware.isHeadDepartment, validateFieldsMiddleware, userController.importUsers);

module.exports = router;
