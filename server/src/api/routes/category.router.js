const express = require('express');
const { check, param } = require('express-validator');
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
    const categoryServiceInstance = Container.get('CategoryService');

    router
        // get configs
        .get(
            '/',
            isAuth,
            attachCurrentUser,
            async (req, res) => {
                const { storeId } = req.currentUser;

                try {
                    const category = await categoryServiceInstance.findAll(storeId);

                    return new Response.Builder(res)
                        .data(category)
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
            [
                check('name')
                    .isString()
                    .isLength({ min: 1, max: 80 })                
            ],
            validationResult,
            isAuth,
            attachCurrentUser,
            allowedRoles('store-admin', 'super-admin'),
            async (req, res) => {
                try {
                    const { name } = req.body;
                    const { storeId } = req.currentUser;

                    const saved = await categoryServiceInstance.save(
                        name,
                        storeId
                    );

                    return new Response.Builder(res)
                        .data(saved)
                        .status(200)
                        .build()
                        .sendJSON();
                } catch (e) {
                    let errorMesage = 'Could not save category.';
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
            '/:categoryId',
            [param('categoryId').isString()],
            validationResult,
            isAuth,
            attachCurrentUser,
            allowedRoles('store-admin', 'super-admin'),
            async (req, res) => {
                try {
                    const { categoryId } = req.params;
                    const { storeId } = req.currentUser;

                    const deleted = await categoryServiceInstance.delete(categoryId, storeId);

                    return new Response.Builder(res)
                        .data(deleted)
                        .status(200)
                        .build()
                        .sendJSON();
                } catch (e) {
                    let errorMesage = 'Could not delete category.';
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
    app.use('/category', router);
};
