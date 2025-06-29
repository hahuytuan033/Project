const Order = require('../models/orderModel');

const createOrder = async (orderData) => {
    return await Order.create(orderData);
};

const getAllOrders = async () => {
    return await Order.find().sort({ createdAt: -1 });
};

const updateOrder = async (orderId, updateData) => {
    // Chỉ cho phép cập nhật status và notes
    return await Order.findByIdAndUpdate(orderId, { status: updateData.status, notes: updateData.notes }, { new: true });
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrder
};
