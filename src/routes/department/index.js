const express = require("express");
const router = express.Router();
const departmentController = require("../../controllers/department.controller");

router.get("/department", departmentController.getByCondition);
router.post("/department", departmentController.create);
router.get("/department/:id", departmentController.getDetail);
router.put("/department/:id", departmentController.edit);
router.delete("/department/:id", departmentController.delete);

module.exports = router;
