const expressJwt = require('express-jwt');

const { JWT_SECRET } = require('../../configs');

/**
 * @description Gets the token from the Authorization header.
 * Authorization: Bearer ${JWT}
 * @param {*} req 
 */
const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
}

const middleware = expressJwt({
    secret: JWT_SECRET,
    userProperty: 'token',
    getToken: getTokenFromHeader
});

module.exports = middleware;
