const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin.controller");

router.post("/admin/delete", adminController.deleteUsersByCondition);

module.exports = router;
