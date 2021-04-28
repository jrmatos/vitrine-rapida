/**
 * @author Paulo Matos
 * @description Use this class as a standard for creating JSON payload responses.
 */
const http = require('http');
const logger = require('./logger');

class Response {
    constructor(build) {
        this.res = build.res;
        this.responseJSON = build.responseJSON;
    }

    sendJSON() {
        if (!this.res) throw new Error('The response object was not provided.');
        this.res.json(this.responseJSON);
    }

    static get Builder() {
        class Builder {
            constructor(res) {
                this.res = res;
                this.responseJSON = {};
            }

            /**
             * @description use this when you have a payload to return
             */
            data(data) {
                this.responseJSON.data = data;
                return this;
            }

            /**
             * @description use this for returning custom messages
             */
            message(message) {
                this.responseJSON.message = message;
                return this;
            }

            /**
             * @description use this to give a clue about an error
             */
            error(error, exception) {
                logger.error(exception);
                this.responseJSON.error = error;
                return this;
            }

            /**
             * @description use this for sending the descriptive name of a given status code
             * Look at all the values from http.STATUS_CODES
             */
            status(statusCode) {
                if (this.res) {
                    this.res.status(statusCode);
                }
                this.responseJSON.status =
                    http.STATUS_CODES[statusCode] || null;
                return this;
            }

            /**
             * @description use this if you want to return a custom key/value
             */
            keyValue(key, value) {
                this.responseJSON[key] = value;
                return this;
            }

            build() {
                return new Response(this);
            }
        }

        return Builder;
    }
}

module.exports = Response;
