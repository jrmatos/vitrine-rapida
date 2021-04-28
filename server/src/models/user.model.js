const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: [
                'super-admin',
                'store-admin',
                'store-employee'
            ],
        },
        emailVerificationCode: {
            type: String,
            required: true,
        },
        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        enabled: {
            type: Boolean,
            required: true,
            default: true,
        },
        storeId: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('user', userSchema);
