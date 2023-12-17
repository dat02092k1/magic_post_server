const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../rest_core/success.response");
const UserService = require("../services/user.service");
const OrderService = require("../services/oder.service");
const Order = require("../models/order.model");
const PDFDocument = require("pdfkit");
const pdf = require("html-pdf");
const {templateEngine} = require("../documents/templateHtml");

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
     
    pdf
    .create(templateEngine(orderDetails), {})
    .toBuffer((err, buffer) => {
      if (err) {
        res.status(500).send("Error generating PDF");
      } else {
        // Send the generated PDF buffer as a response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=result.pdf');
        res.status(200).send(buffer);
      }
    });
});
    // const doc = new PDFDocument();
    // let buffers = [];
    // doc.on('data', buffers.push.bind(buffers));
    // doc.on('end', () => {
    //     let pdfData = Buffer.concat(buffers);
    //     res.writeHead(200, {
    //         'Content-Length': Buffer.byteLength(pdfData),
    //         'Content-Type': 'application/pdf',
    //         'Content-disposition': `attachment;filename=order_${req.body.orderId}.pdf`,
    //     }).end(pdfData);
    // });

    // // PDF Content
    // doc.fontSize(25).text('Order Details', {
    //     underline: true
    // });
    // doc.fontSize(15).text(`Order ID: ${orderDetails._id}`);
    // doc.text(`Customer Name: ${orderDetails.sender}`);
    // doc.moveDown();
    //     doc.text(`${orderDetails.weight}: $${orderDetails.price}`);
    // doc.text(`Total: $${orderDetails.expectedDate}`);

    // doc.end();

}

module.exports = new OrderController();
