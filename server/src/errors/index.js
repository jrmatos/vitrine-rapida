const DuplicateModelError = require('./duplicateModel.error');
const ModelNotFoundError = require('./modelNotFound.error');
const SignInError = require('./signIn.error');
const NotVerifiedError = require('./notVerifiedEmail.error');
const MaxAmountOfResourceReachedError = require('./maxAmountOfResourceReachedError.error');

module.exports = {
    DuplicateModelError,
    ModelNotFoundError,
    SignInError,
    NotVerifiedError,
    MaxAmountOfResourceReachedError
};
