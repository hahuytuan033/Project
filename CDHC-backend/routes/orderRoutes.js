const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Chỉ admin hoặc nhân viên mới có quyền tạo và quản lý đơn hàng
router.post('/', authMiddleware, adminMiddleware, OrderController.createOrder);
router.get('/', authMiddleware, adminMiddleware, OrderController.getAllOrders);
router.put('/:id', authMiddleware, adminMiddleware, OrderController.updateOrder);

module.exports = router;