const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../rest_core/success.response");
const UserService = require("../services/user.service");
const OrderService = require("../services/oder.service");
const Order = require("../models/order.model");
const PDFDocument = require("pdfkit");
const pdf = require("html-pdf");
const { templateEngine } = require("../documents/templateHtml");
const qr = require("qrcode");

class OrderController {
  create = asyncHandler(async (req, res, next) => {
    CREATED(res, "order created", await OrderService.createOrder(req.body));
  });

  get = asyncHandler(async (req, res, next) => {
    OK(res, "get orders", await OrderService.getOrders());
  });

  getDetails = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "get order details",
      await OrderService.getOrderDetails(req.params.id)
    );
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

  searchOrder = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "search order success",
      await OrderService.searchOrder(req.body.orderId)
    );
  });

  createPdf = asyncHandler(async (req, res, next) => {
    const orderDetails = await Order.findById(req.body.orderId)
      .populate("send_department")
      .populate("receive_department")
      .populate("current_department")
      .populate("next_department")
      .lean();
    if (!orderDetails) throw new Api404Error("order not found");

    const data = {
      id: orderDetails._id,
      name: orderDetails.name,
      description: orderDetails.description,
      send_department: orderDetails.send_department?.name || "",
      receive_department: orderDetails.receive_department?.name || "",
      current_department: orderDetails.current_department?.name || "",
      next_department: orderDetails.next_department?.name || "",
      status: orderDetails.status,
      senderPhone: orderDetails.senderPhone,
      receiverPhone: orderDetails.receiverPhone,
    };

    const qrCode = await qr.toDataURL(JSON.stringify(data));

    pdf
      .create(templateEngine(orderDetails, qrCode), {})
      .toBuffer((err, buffer) => {
        if (err) {
          res.status(500).send("Error generating PDF");
        } else {
          // Send the generated PDF buffer as a response
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Disposition", "inline; filename=result.pdf");
          res.status(200).send(buffer);
        }
      });
  });

  deleteMany = asyncHandler(async (req, res, next) => {
    OK(res, "delete orders", await OrderService.deleteMany(req.body.condition));
  });
}

module.exports = new OrderController();
