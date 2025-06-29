const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    items: [orderItemSchema],
    shippingFee: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Đang chờ xử lý' },
    notes: { type: String },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;