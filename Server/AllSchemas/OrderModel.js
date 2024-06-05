const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const OrderSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    review: {
        type: String
    },
    date: {
        type: String, // Change the type to String
        default: () => moment().tz('Asia/Karachi').format() // Format the date as a string
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
