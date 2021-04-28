const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const storeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        maxlength: 80
    },
    description: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        maxlength: 200
    },
    whatsappNumber: {
        type: String,
        maxlength: 80
    },
    friendlyUrl: {
        type: String,
        unique: true,
        maxlength: 80
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('store', storeSchema);