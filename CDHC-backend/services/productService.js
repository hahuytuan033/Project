const Product = require('../models/productModel');

const createProduct = async (productData) => {
    return await Product.create(productData);
};

const getAllProducts = async (filters = {}) => {
    const query = {};
    // Xây dựng query dựa trên filters
    if (filters.category) query.category = filters.category;
    if (filters.size) query.size = filters.size;
    if (filters.color) query.color = filters.color;
    if (filters.priceMin || filters.priceMax) {
        query.price = {};
        if (filters.priceMin) query.price.$gte = Number(filters.priceMin);
        if (filters.priceMax) query.price.$lte = Number(filters.priceMax);
    }
    return await Product.find(query).sort({ createdAt: -1 });
};

const updateProduct = async (productId, updateData) => {
    return await Product.findByIdAndUpdate(productId, updateData, { new: true });
};

const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};