const isAuth = require('./isAuth');
const attachCurrentUser = require('./attachCurrentUser');
const validationResult = require('./validationResult');
const allowedRoles = require('./allowedRoles');

module.exports = {
    isAuth,
    attachCurrentUser,
    validationResult,
    allowedRoles
};
