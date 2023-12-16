const express = require("express");
const router = express.Router();
const departmentController = require("../../controllers/department.controller");
var upload = require('../../helpers/upload').upload;

router.get("/department", departmentController.getByCondition);
router.post("/department", upload.single('image'), departmentController.create);
router.get("/department/:id", departmentController.getDetail);
router.put("/department/:id", departmentController.edit);
router.delete("/department/:id", departmentController.delete);

module.exports = router;
