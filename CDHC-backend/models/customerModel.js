const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    points: { type: Number, default: 0 },
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;