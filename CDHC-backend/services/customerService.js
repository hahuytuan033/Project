const Customer = require('../models/customerModel');

const createCustomer = async (customerData) => {
    return await Customer.create(customerData);
};

const getAllCustomers = async () => {
    return await Customer.find().sort({ createdAt: -1 });
};

const updateCustomer = async (id, updateData) => {
    const customer = await Customer.findByIdAndUpdate(id, updateData, {
        new: true, // Trả về document đã được cập nhật
        runValidators: true, // Chạy các trình xác thực của schema
    });
    if (!customer) {
        throw new Error('Không tìm thấy khách hàng.');
    }
    return customer;
};

const deleteCustomer = async (id) => {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
        throw new Error('Không tìm thấy khách hàng.');
    }
    return customer;
};

module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
};