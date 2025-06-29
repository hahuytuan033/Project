const CustomerService = require('../services/customerService');

const createCustomer = async (req, res) => {
    try {
        const customer = await CustomerService.createCustomer(req.body);
        res.status(201).json({ message: 'Thêm khách hàng thành công', data: customer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await CustomerService.updateCustomer(req.params.id, req.body);
        res.status(200).json({ message: 'Cập nhật khách hàng thành công', data: customer });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        await CustomerService.deleteCustomer(req.params.id);
        res.status(200).json({ message: 'Xóa khách hàng thành công' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
};
