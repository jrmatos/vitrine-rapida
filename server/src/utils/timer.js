const getCurrentTimestamp = () => new Date().getTime();
const getCurrentTimeISOString = () => new Date().toISOString();

module.exports = {getCurrentTimestamp, getCurrentTimeISOString};