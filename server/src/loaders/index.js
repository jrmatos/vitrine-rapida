

const expressLoader = require('./express.loader');
const mongooseLoader = require('./mongoose.loader');
const dependencyInjectorLoader = require('./dependencyInjector.loader');

const logger = require('../utils/logger');

const init = async (app) => {
    const mongoConnection = await mongooseLoader();
    logger.info('Mongoose loaded! 👍');

    dependencyInjectorLoader(mongoConnection);
    logger.info('Dependency Injector loaded! 👍');

    expressLoader(app);
    logger.info('Express loaded! 👍');
};

module.exports = {init};
