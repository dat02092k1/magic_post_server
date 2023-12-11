const express = require("express");
const router = express.Router();
const oderController = require("../../controllers/order.controller");
const orderController = require("../../controllers/order.controller");

router.post("/order", orderController.create);
router.get("/orders", orderController.get);
router.get("/orders/department/:id", orderController.getCurrentDepartment);
router.post("/orders", orderController.get);
router.delete("/orders/:id", orderController.delete);
router.put("/orders/:id", orderController.update);

module.exports = router;
