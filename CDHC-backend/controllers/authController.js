
const AuthService = require('../services/authService');

const register = async (req, res) => {
    try {
        const userData = req.body;
        // Kiểm tra dữ liệu đầu vào cơ bản
        if (!userData.email || !userData.password || !userData.name) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }

        const user = await AuthService.registerUser(userData);
        res.status(201).json({
            message: 'Đăng ký thành công!',
            data: user
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const loginData = req.body;
        if (!loginData.email || !loginData.password) {
            return res.status(400).json({ message: 'Vui lòng điền email và mật khẩu' });
        }

        const user = await AuthService.loginUser(loginData);
        res.status(200).json({
            message: 'Đăng nhập thành công!',
            data: user
        });
    } catch (error) {
        res.status(401).json({ message: error.message }); // 401 Unauthorized
    }
};

// Controller để lấy thông tin cá nhân (ví dụ cho route được bảo vệ)
const getUserProfile = async (req, res) => {
    // Middleware `authMiddleware` đã xác thực và gắn `req.user`
    try {
        const user = await User.findById(req.user.id).select('-password'); // Bỏ trường password
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};


module.exports = {
    register,
    login,
    getUserProfile
};