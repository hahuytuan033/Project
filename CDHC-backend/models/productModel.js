const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String },
    color: { type: String },
    category: { type: String, required: true },
    imageUrl: { type: String },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
