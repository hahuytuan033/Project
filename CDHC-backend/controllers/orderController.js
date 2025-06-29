const OrderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const order = await OrderService.createOrder(req.body);
        res.status(201).json({ message: 'Tạo đơn hàng thành công', data: order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await OrderService.updateOrder(req.params.id, req.body);
        if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        res.status(200).json({ message: 'Cập nhật đơn hàng thành công', data: order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrder
};