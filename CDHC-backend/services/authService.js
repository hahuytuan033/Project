
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

// Hàm tạo JWT token
const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '30d', 
    });
};


const registerUser = async (userData) => {
    const { email, password } = userData;

    // 1. Kiểm tra xem người dùng đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('Người dùng đã tồn tại');
    }

    // 2. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo người dùng mới
    const user = await User.create({
        ...userData,
        password: hashedPassword,
    });

    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id, user.isAdmin),
        };
    } else {
        throw new Error('Dữ liệu người dùng không hợp lệ');
    }
};

const loginUser = async (loginData) => {
    const { email, password } = loginData;

    // 1. Tìm người dùng bằng email
    const user = await User.findOne({ email });

    // 2. Nếu người dùng tồn tại, so sánh mật khẩu
    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id, user.isAdmin),
        };
    } else {
        throw new Error('Email hoặc mật khẩu không đúng');
    }
};

module.exports = {
    registerUser,
    loginUser,
};