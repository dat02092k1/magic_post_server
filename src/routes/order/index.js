const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order.controller");

router.post("/order", orderController.create);
router.get("/orders", orderController.get);
router.get("/orders/department/:id", orderController.getCurrentDepartment);
router.post("/orders", orderController.getOrdersByCondition);
router.delete("/orders/:id", orderController.delete);
router.put("/orders/:id", orderController.update);
router.get("/orders/:id", orderController.getDetails);
router.post("/orders-status", orderController.updateOrdersStatus);
router.post("/orders-search", orderController.searchOrder);
router.post("/orders-pdf", orderController.createPdf);

module.exports = router;
