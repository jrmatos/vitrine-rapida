/**
 * @author Paulo Matos
 * @description Use this module as a standard for logging.
 */
const timer = require('./timer');

const logger = (type) => (...logs) =>
    console[type](type.toUpperCase(), timer.getCurrentTimeISOString(), ...logs);

module.exports = {
    info: logger('info'),
    error: logger('error'),
};
