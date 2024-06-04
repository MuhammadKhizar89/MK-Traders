const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
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
    Rating: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});
const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
