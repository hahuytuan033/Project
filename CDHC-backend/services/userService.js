const User = require('../models/userModel');

const getUserDetails = async (userId) => {
    // Tìm người dùng bằng ID và loại bỏ trường password
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('Không tìm thấy người dùng');
    }
    return user;
};

const updateUserDetails = async (userId, updateData) => {
    // Chỉ cho phép cập nhật một số trường nhất định
    const allowedUpdates = ['name', 'email', 'phone', 'address', 'avatar'];
    const updates = {};
    for (const key in updateData) {
        if (allowedUpdates.includes(key)) {
            updates[key] = updateData[key];
        }
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!user) {
        throw new Error('Cập nhật thất bại, không tìm thấy người dùng.');
    }
    return user;
};

module.exports = {
    getUserDetails,
    updateUserDetails
};