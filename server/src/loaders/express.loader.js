const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

const { API } = require('../configs');
const routes = require('../api');

const logger = require('../utils/logger');

const limiter = rateLimit({
    windowMs: 1 * 1000, // 2 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

const expressLoader = (app) => {
    // configure the public
    app.use(express.static('public'));

    // use helmet
    app.use(helmet());

    // use request limiter
    app.use(limiter);

    // body parser config
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // allow cors
    app.use(cors());

    // registering routers
    app.use(API.prefix, routes());

    // middleware for addressing not handled errors
    app.use((err, req, res, next) => {
        // catch errors for token expired or malforned
        if (err.name === 'UnauthorizedError') {
            const { message } = err;
            logger.error(message);
            res.status(err.status).send({ message });
            return;
        }
        next();
    });

    // index route
    app.get('/', (req, res) => {
        res.render('index');
    });
};

module.exports = expressLoader;
