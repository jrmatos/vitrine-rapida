const dotenv = require('dotenv');

// load environment variables from the .env file
dotenv.config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
    SENDER_EMAIL_PASSWORD: process.env.SENDER_EMAIL_PASSWORD,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AW3_S3_BUCKET_URL: process.env.AW3_S3_BUCKET_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MAX_AMOUNT_OF_PRODUCTS: process.env.MAX_AMOUNT_OF_PRODUCTS,
    MAX_AMOUNT_OF_CATEGORIES: process.env.MAX_AMOUNT_OF_CATEGORIES,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10),
    API: {
        prefix: '/api'
    }
};
