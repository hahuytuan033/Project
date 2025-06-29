const UserService = require('../services/userService');

const getUserDetails = async (req, res) => {
    try {
        // req.user.id được lấy từ authMiddleware
        const user = await UserService.getUserDetails(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const user = await UserService.updateUserDetails(req.user.id, req.body);
        res.status(200).json({ message: 'Cập nhật thành công', data: user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUserDetails,
    updateUserDetails
};