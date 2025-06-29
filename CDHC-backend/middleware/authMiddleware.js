
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Lấy token từ header (format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];
            // Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Lấy thông tin người dùng từ token (không lấy password) và gán vào request
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Chuyển sang middleware hoặc controller tiếp theo
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Xác thực thất bại, token không hợp lệ' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Xác thực thất bại, không tìm thấy token' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Không có quyền truy cập' }); // 403 Forbidden
    }
};

module.exports = { authMiddleware, adminMiddleware };