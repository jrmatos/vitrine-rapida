const Response = require('../../utils/response');

const allowedRoles = (...roles) => (req, res, next) => {
    const { currentUser } = req;

    if (roles.indexOf(currentUser.role) === -1) {
        return new Response.Builder(res)
            .error('The user role is not allowed to perform this action.')
            .status(401)
            .build()
            .sendJSON();
    }
    next();
}


module.exports = allowedRoles;
