// express app
const express = require('express');
const https = require('https');
const fs = require('fs');

var options = {
    key  : fs.readFileSync('certs/server.key', 'utf8'),
    cert : fs.readFileSync('certs/537263442a1c27f6.crt', 'utf8'),
    ca: [
        fs.readFileSync('certs/gd_bundle01.crt'),
        fs.readFileSync('certs/gd_bundle02.crt'),
        fs.readFileSync('certs/gd_bundle03.crt')
    ]
};

// configs
const { PORT } = require('./configs');

// logger
const logger = require('./utils/logger');

// application loaders
const loaders = require('./loaders');

async function startServer() {
    const app = express();

    await loaders.init(app);

    https.createServer(options, app).listen(PORT, function(){
        logger.info(`Running at ${PORT} 🎉`);
    });

    process.on('SIGINT', () => { 
        logger.info('Bye bye! ❤️'); 
        process.exit(); 
    });
}

startServer();
