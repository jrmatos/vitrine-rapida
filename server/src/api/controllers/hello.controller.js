const { Container } = require('typedi');

const Response = require('../../utils/response');

function helloGETController (req, res) {
    const helloServiceInstance = Container.get('HelloService');

    return new Response.Builder(res)
        .data(helloServiceInstance.greetings())
        .keyValue('user', req.currentUser)
        .status(200)
        .build()
        .sendJSON();
}

module.exports = {
    helloGETController
};
