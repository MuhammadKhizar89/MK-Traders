const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    Rating: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    
    Image: {
        type: String,
        required: true
    }
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
