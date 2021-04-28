const express = require('express');
const { check } = require('express-validator');
const { Container } = require('typedi');

const Response = require('../../utils/response');

const { isAuth, attachCurrentUser, validationResult } = require('../middlewares');

const {
    DuplicateModelError,
    ModelNotFoundError,
    SignInError,
    NotVerifiedError
} = require('../../errors');

const router = express.Router();

module.exports = (app) => {

    const authServiceInstance = Container.get('AuthService');

    router
        .post('/signup', [
            check('firstName').isString(),
            check('lastName').isString(),
            check('email').isString().isEmail(),
            check('password').isString().isLength({ min: 6, max: 15 }),
        ], validationResult, async (req, res) => {
            try{
                const { firstName, lastName, email, password } = req.body;
                const signUpResult = await authServiceInstance.signUp(
                    firstName,
                    lastName,
                    email,
                    password
                );

                return new Response.Builder(res)
                                .data(signUpResult)
                                .status(200)
                                .build()
                                .sendJSON();
            } catch (e) {
                let errorMesage = 'Sign up failed.';
                let status = 500;

                if (e instanceof DuplicateModelError) {
                    errorMesage = e.message;
                    status = 409;
                } else if (e instanceof ModelNotFoundError) {
                    errorMesage = e.message;
                    status = 403; // forbidden
                }

                return new Response.Builder(res)
                                .error(errorMesage, e)
                                .status(status)
                                .build()
                                .sendJSON();
            }
        })

        .post('/signin', [
            check('email').isString().isEmail(),
            check('password').isString()
        ], validationResult, async (req, res) => {
            try{
                const { email, password } = req.body;

                const signInResult = await authServiceInstance.signIn(email, password);

                return new Response.Builder(res)
                                .data(signInResult)                                
                                .status(200)
                                .build()
                                .sendJSON();
            } catch (e) {
                let errorMesage = 'Sign in failed.';
                let status = 500;

                if (e instanceof ModelNotFoundError || e instanceof SignInError) {
                    errorMesage = e.message;
                    status = 401;
                }

                if (e instanceof NotVerifiedError) {
                    errorMesage = e.message;
                    status = 403;
                }

                return new Response.Builder(res)
                                .error(errorMesage, e)
                                .status(status)
                                .build()
                                .sendJSON();
            }
        })

        .get('/emailconfirmation/:confirmationCode', async (req, res) => {
            const { confirmationCode } = req.params;
            
            try{
                const result = await authServiceInstance.emailConfirmation(confirmationCode);

                return new Response.Builder(res)
                                .data(result)
                                .status(200)
                                .build()
                                .sendJSON();
            } catch (e) {
                let errorMesage = 'Confirmation failed.';
                let status = 500;

                return new Response.Builder(res)
                                .error(errorMesage, e)
                                .status(status)
                                .build()
                                .sendJSON();
            }
        })

        /**
         * @description This endpoint is used for validating JWT.
         * If the token is valid, then it returns the user public data.
         */
        .get('/me-from-token', isAuth, attachCurrentUser, (req, res) => {
            return new Response.Builder(res)
                                    .data({ user: req.currentUser })
                                    .status(200)
                                    .build()
                                    .sendJSON();
        })
        
    // register router
    app.use('/auth', router);
}
