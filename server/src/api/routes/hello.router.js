const express = require('express');

const { helloGETController } = require('../controllers/hello.controller');
const { isAuth, attachCurrentUser } = require('../middlewares');

const router = express.Router();

module.exports = (app) => {
    router
        /**
         *This route simply returns a greeting and the user data
         * from the token. This comes in handy for testing.
         */
        .get('/', isAuth, attachCurrentUser, helloGETController);

    // register router
    app.use('/hello', router);
};
