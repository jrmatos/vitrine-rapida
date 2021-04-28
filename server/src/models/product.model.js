const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80
    },
    description: {
        type: String,
        required: true,
    },
    pictureUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    storeId: {
        type: String,
        required: true
    },
    categoryId: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('product', productSchema);