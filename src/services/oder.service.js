const Order = require("../models/order.model");
const Department = require("../models/department.model");
const UtilFunc = require("../utils/utils");
const {Api404Error, Api403Error} = require("../rest_core/error.response");
const qr = require('qrcode');

class OrderService {    
    static async createOrder(order) {
        console.log(order);
        const newOrder = new Order(order);

        const senderDep = await Department.findById(order.send_department).lean();
        if (!senderDep) throw new Api404Error("sender department not found");

        const receiverDep = await Department.findById(order.receive_department).lean();
        if (!receiverDep) throw new Api404Error("receiver department not found");

        if (order.send_department === order.receive_department) throw new Api403Error("sender and receiver department must be different");

        if (order.current_department) {
        const currentDep = await Department.findById(order.current_department).lean();
        if (!currentDep) throw new Api404Error("current department not found");
        }

        if (order.next_department) {
        const nextDep = await Department.findById(order.next_department).lean();
        if (!nextDep) throw new Api404Error("next department not found");
        }

        newOrder['status'] = 'processing';
        newOrder['current_department'] = order.send_department;
        newOrder['description'] = [{date: Date.now(), description: 'Đơn hàng đã được tạo'}];
        await newOrder.save(); 

        return {
            order: newOrder,
        };
    }
    
    static async getOrders() {
        return {
            orders: await Order.find().lean(),
            numbers: await Order.countDocuments().lean(),
        }
    }

    static async getOrderDetails(id) {
        const order = await Order.findById(id).populate('send_department').populate('receive_department').populate('current_department').populate('next_department').lean();

        if (!order) throw new Api404Error("order not found");

        if (order.current_department?.linkDepartments.length > 0)
        {
            const departmentPromises = order.current_department.linkDepartments.map(async (item) => {
                const dep = await Department.findById(item.departmentId).lean();
                console.log(dep);
                item['name'] = dep.name;
              });

              await Promise.all(departmentPromises);
        }
        
        if (!order) throw new Api404Error("order not found");

        return {
            order: order,
        }
    }

    static async getOrdersByDepartmentId(departmentId) {
        return {
            orders: await Order.find({send_department: departmentId}).lean(),
        }
    }

    static async getOrdersByCondition(condition) {
        return {
            numbers: await Order.countDocuments(condition).lean(), 
            // orders: await Order.find(condition).lean(),
            orders: await Order.find(condition).populate('send_department').populate('receive_department').populate('current_department').populate('next_department').lean(),
        }
    }

    static async deleteOrder(id) {
        const order = await Order.findById(id).lean();
        if (!order) throw new Api404Error("order not found");

        await Order.findByIdAndDelete(id).lean(); 

        return {
            order: order,
        }
    }

    static async updateOrderStatus(id, order) {
        const holderOrder = await Order.findById(id);
        if (!holderOrder) throw new Api404Error("order not found");

        if (holderOrder.status === "delivered") throw new Api403Error("order has been delivered");

        if (order.next_department) {
            const nextDep = await Department.findById(order.next_department).lean();
            if (!nextDep) throw new Api404Error("next department not found");
        }

        if (order.current_department) {
            const currentDep = await Department.findById(order.current_department).lean();
            if (!currentDep) throw new Api404Error("current department not found");
        }

        if (order.description) {
            holderOrder.description.push({date: Date.now(), description: order.description});
            delete order.description; 
        }

        if (!order.status) throw new Api403Error("status is required");
        
        UtilFunc.updateObj(holderOrder, order);
         
        if (order.current_department.toString() === holderOrder.receive_department.toString()) {
            holderOrder.status = "delivered";
        }
        await holderOrder.save();

        return {
            order: holderOrder,
        }
    }

    static async updateOrdersStatus(orders, type) {
        if (!orders || orders.length === 0) throw new Api403Error("orders is required");

        if (!type) throw new Api403Error("type is required");

        switch (type) {
            case "confirm":
                orders.forEach(async (item) => {
                    const holderOrder = await Order.findById(item.orderId);
                    if (!holderOrder) throw new Api404Error("order not found");
                    holderOrder.current_department = item.current_department;
                    (item.current_department === holderOrder.receive_department) ? holderOrder.status = 'delivered' : holderOrder.status = "accepted";
                    holderOrder.next_department = null;
                    if (item.description) holderOrder.description.push({date: Date.now(), description: item.description});
                    await holderOrder.save();
                });
                break;

            case "transfer":
                orders.forEach(async (item) => {
                    const holderOrder = await Order.findById(item.orderId);
                    if (!holderOrder) throw new Api404Error("order not found");
                    holderOrder.status = "processing";
                    holderOrder.next_department = item.next_department;
                    if (item.description) holderOrder.description.push({date: Date.now(), description: item.description});
                    await holderOrder.save();
                });
                break;

            case "resend":
                orders.forEach(async (item) => {
                    const holderOrder = await Order.findById(item.orderId);
                    if (!holderOrder) throw new Api404Error("order not found");
                    holderOrder.status = "processing";
                    if (item.description) holderOrder.description.push({date: Date.now(), description: item.description});
                    await holderOrder.save();
                });
                break;

            case "reject":
                orders.forEach(async (item) => {
                    const holderOrder = await Order.findById(item.orderId);
                    if (!holderOrder) throw new Api404Error("order not found");
                    holderOrder.status = "rejected";
                    if (item.description) holderOrder.description.push({date: Date.now(), description: item.description});
                    await holderOrder.save();
                });
                break;

            case "cancel":
                orders.forEach(async (item) => {
                    const holderOrder = await Order.findById(item.orderId);
                    if (!holderOrder) throw new Api404Error("order not found");
                    holderOrder.status = "cancelled";
                    if (item.description) holderOrder.description.push({date: Date.now(), description: item.description});
                    await holderOrder.save();
                });

            default:
                break;
        }
    }

    static async searchOrder(orderId) {
        const holderOrder = await Order.findById(orderId).populate('send_department').populate('receive_department').populate('current_department').populate('next_department').lean();
        if (!holderOrder) throw new Api404Error("order not found");

        const qrCode = await qr.toDataURL(JSON.stringify(holderOrder));

        return {
            order: holderOrder,
            qrCode: qrCode,
        }
    }
}

module.exports = OrderService;