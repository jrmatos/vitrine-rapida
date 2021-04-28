const { validationResult } = require('express-validator');

const Response = require('../../utils/response');

const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return new Response.Builder(res)
            .error(errors.array())
            .status(422)
            .build()
            .sendJSON();
    }
    next();
}

module.exports = validationResultMiddleware;
