
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
console.log('Kiểm tra AuthController:', AuthController); // <-- THÊM DÒNG NÀY

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/profile', authMiddleware, AuthController.getUserProfile);

router.get('/admin-only', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: `Chào mừng Admin ${req.user.name}!` });
});


module.exports = router;