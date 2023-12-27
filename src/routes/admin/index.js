const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin.controller");
const verifyMiddileware = require("../../middleware/verify");

router.post("/admin/delete", verifyMiddileware.isAdmin, adminController.deleteUsersByCondition);

module.exports = router;
