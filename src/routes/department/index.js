const express = require("express");
const router = express.Router();
const departmentController = require("../../controllers/department.controller");
var upload = require('../../helpers/upload').upload;
const verifyMiddileware = require("../../middleware/verify");

router.get("/department", verifyMiddileware.isHeadDepartment, departmentController.getByCondition);
router.post("/department", verifyMiddileware.isAdmin, upload.single('image'), departmentController.create);
router.get("/department/:id", verifyMiddileware.isHeadDepartment, departmentController.getDetail);
router.put("/department/:id", verifyMiddileware.isHeadDepartment, departmentController.edit);
router.delete("/department/:id", verifyMiddileware.isHeadDepartment, departmentController.delete);

module.exports = router;
