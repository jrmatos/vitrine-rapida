const express = require('express');
const { check, param } = require('express-validator');
const multer = require('multer');
const upload = multer()

const { Container } = require('typedi');

const Response = require('../../utils/response');

const { ModelNotFoundError, DuplicateModelError } = require('../../errors');

const {
    isAuth,
    attachCurrentUser,
    validationResult,
    allowedRoles
} = require('../middlewares');

const router = express.Router();

module.exports = (app) => {
    const storeServiceInstance = Container.get('StoreService');

    router
        // get configs
        .get(
            '/configs',
            isAuth,
            attachCurrentUser,
            async (req, res) => {
                const { storeId } = req.currentUser;

                try {
                    const store = await storeServiceInstance.findById(storeId);

                    return new Response.Builder(res)
                        .data(store)
                        .status(200)
                        .build()
                        .sendJSON();
                } catch (e) {
                    return new Response.Builder(res)
                        .error('Could not retrieve resources', e)
                        .status(500)
                        .build()
                        .sendJSON();
                }
            }
        )

        // get store
        .get(
            '/:storeFriendlyUrl',
            async (req, res) => {
                const { storeFriendlyUrl } = req.params;

                try {
                    const store = await storeServiceInstance.findByFriendlyUrl(storeFriendlyUrl);

                    return new Response.Builder(res)
                        .data(store)
                        .status(200)
                        .build()
                        .sendJSON();
                } catch (e) {
                    return new Response.Builder(res)
                        .error('Could not retrieve resources', e)
                        .status(500)
                        .build()
                        .sendJSON();
                }
            }
        )

        // update
        .put(
            '/configs',
            [
                check('name')
                    .isString()
                    .isLength({ min: 1, max: 80 }),
                check('description')
                    .isString(),
                check('whatsappNumber')
                    .isString()
                    .isLength({ min: 1, max: 80 }),
                check('friendlyUrl')
                    .isString()
                    .isLength({ min: 1, max: 80})
            ],
            validationResult,
            isAuth,
            attachCurrentUser,
            allowedRoles('store-admin', 'super-admin'),
            async (req, res) => {
                try {
                    const { name, description, whatsappNumber, friendlyUrl } = req.body;

                    const { storeId } = req.currentUser;

                    const updated = await storeServiceInstance.editConfigs(
                        name, description, whatsappNumber, friendlyUrl, storeId
                    );

                    return new Response.Builder(res)
                        .data(updated)
                        .status(200)
                        .build()
                        .sendJSON();
                } catch (e) {
                    let errorMesage = 'Could not update store.';
                    let status = 500;

                    if (e instanceof DuplicateModelError) {
                        errorMesage = e.message;
                        status = 409;
                    } else if (e instanceof ModelNotFoundError) {
                        errorMesage = e.message;
                        status = 404;
                    }

                    return new Response.Builder(res)
                        .error(errorMesage, e)
                        .status(status)
                        .build()
                        .sendJSON();
                }
            }
        )

        // update
        .put(
            '/logo',
            upload.single('logo'),
            isAuth,
            attachCurrentUser,
            allowedRoles('store-admin', 'super-admin'),
            async (req, res) => {
                try {
                    const logo = req.file;

                    const { storeId } = req.currentUser;

                    const updated = await storeServiceInstance.editLogo(
                        logo, storeId
                    );

                    return new Response.Builder(res)
                        .data(updated)
                        .status(200)
                        .build()
                        .sendJSON();
                } catch (e) {
                    let errorMesage = 'Could not update store.';
                    let status = 500;

                    if (e instanceof DuplicateModelError) {
                        errorMesage = e.message;
                        status = 409;
                    } else if (e instanceof ModelNotFoundError) {
                        errorMesage = e.message;
                        status = 404;
                    }

                    return new Response.Builder(res)
                        .error(errorMesage, e)
                        .status(status)
                        .build()
                        .sendJSON();
                }
            }
        );


    // register router
    app.use('/store', router);
};
