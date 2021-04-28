const mongoose = require('mongoose');
const Promise = require('bluebird');

const logger = require ('../utils/logger');

const { NODE_ENV, MONGO_URI, MONGO_USER, MONGO_PASS } = require('../configs/index');

mongoose.Promise = Promise;

const mongooseLoader = async () => {
    try {
        let configs = {
            useNewUrlParser: true,
            autoIndex: false
        }

        if (NODE_ENV === 'production') {
            configs = {
                ...configs,
                auth: {
                    authSource: "admin"
                },
                user: MONGO_USER,
                pass: MONGO_PASS
            }
        }

        const conn = await mongoose.connect(MONGO_URI, configs);
        return conn.connection.db;
    }
    catch (e) {
        logger.error('Mongoose failed to load 👎');
        throw e;
    }
}

module.exports = mongooseLoader;
