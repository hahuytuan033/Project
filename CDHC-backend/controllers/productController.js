const ProductService = require('../services/productService');

const createProduct = async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json({ message: 'Thêm sản phẩm thành công', data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts(req.query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.status(200).json({ message: 'Cập nhật thành công', data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductService.deleteProduct(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};