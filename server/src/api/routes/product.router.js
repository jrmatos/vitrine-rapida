const express = require('express');
const { check, param } = require('express-validator');

const multer = require('multer');
const upload = multer();

const { Container } = require('typedi');

const Response = require('../../utils/response');

const { ModelNotFoundError, DuplicateModelError, MaxAmountOfResourceReachedError } = require('../../errors');

const {
    isAuth,
    attachCurrentUser,
    validationResult,
    allowedRoles
} = require('../middlewares');

const router = express.Router();

module.exports = (app) => {
    const productServiceInstance = Container.get('ProductService');

    router
        // get configs
        .get(
            '/',
            isAuth,
            attachCurrentUser,
            async (req, res) => {
                const { storeId } = req.currentUser;

                try {
                    const product = await productServiceInstance.findAll(storeId);

                    return new Response.Builder(res)
                        .data(product)
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

        // save
        .post(
            '/',
            isAuth,
            upload.single('picture'),
            attachCurrentUser,
            allowedRoles('store-admin', 'super-admin'),
            async (req, res) => {
                try {
                    const { name, description, price, categoryId } = req.body;

                    const picture = req.file;

                    const { storeId } = req.currentUser;

                    const saved = await productServiceInstance.save(
                        name, description, picture, price, categoryId, storeId
                    );

                    return new Response.Builder(res)
                        .data(saved)
                        .status(200)
                        .build()
                        .sendJSON();
                } catch (e) {
                    let errorMesage = 'Could not save product.';
                    let status = 500;

                    if (e instanceof DuplicateModelError) {
                        errorMesage = e.message;
                        status = 409;
                    }
                    
                    if (e instanceof MaxAmountOfResourceReachedError) {
                        errorMesage = e.message;
                        status = 403; // forbidden
                    }

                    return new Response.Builder(res)
                        .error(errorMesage, e)
                        .status(status)
                        .build()
                        .sendJSON();
                }
            }
        )

        // delete
        .delete(
            '/:productId',
            [param('productId').isString()],
            validationResult,
            isAuth,
            attachCurrentUser,
            allowedRoles('store-admin', 'super-admin'),
            async (req, res) => {
                try {
                    const { productId } = req.params;
                    const { storeId } = req.currentUser;

                    const deleted = await productServiceInstance.delete(productId, storeId);

                    return new Response.Builder(res)
                        .data(deleted)
                        .status(200)
                        .build()
                        .sendJSON();
                } catch (e) {
                    let errorMesage = 'Could not delete product.';
                    let status = 500;

                    if (e instanceof ModelNotFoundError) {
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
    app.use('/product', router);
};
