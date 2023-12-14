const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../rest_core/success.response");
const UserService = require("../services/user.service");
const OrderService = require("../services/oder.service");

class OrderController {
  create = asyncHandler(async (req, res, next) => {
    CREATED(res, "order created", await OrderService.createOrder(req.body));
  });

  get = asyncHandler(async (req, res, next) => {
    OK(res, "get orders", await OrderService.getOrders());
  });

  getDetails = asyncHandler(async (req, res, next) => {
    OK(res, "get order details", await OrderService.getOrderDetails(req.params.id));
  });

  getCurrentDepartment = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "get orders by department id",
      await OrderService.getOrdersByDepartmentId(req.params.id)
    );
  });

  getOrdersByCondition = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "get orders by condition",
      await OrderService.getOrdersByCondition(req.body.condition)
    );
  });

  delete = asyncHandler(async (req, res, next) => {
    OK(res, "delete order", await OrderService.deleteOrder(req.params.id));
  });

  update = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "update order",
      await OrderService.updateOrderStatus(req.params.id, req.body)
    );
  });

  updateOrdersStatus = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "update orders status",
      await OrderService.updateOrdersStatus(req.body.orders, req.body.type)
    );
  });
}

module.exports = new OrderController();
