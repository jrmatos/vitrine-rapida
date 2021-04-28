const { Container } = require('typedi');

/**
 * @description This middleware takes the user _id from
 * the token and adds the complete public user data to
 * the currentUser field in the express request object.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const attachCurrentUser = async (req, res, next) => {
    const logger = Container.get('logger');

    try {
        const UserModel = Container.get('UserModel');
        /**
         * TODO: verify if hitting the database is really necessary
         * because we already have these fields present in the token.
         * The trade off is that hitting the database allows us to get
         * always updated user data.
         */
        const userRecord = await UserModel.findById(req.token._id);

        if (!userRecord) {
            return res.sendStatus(401);
        }

        const { _id, email, firstName, lastName, role, storeId } = userRecord;

        req.currentUser = {
            _id,
            email,
            firstName,
            lastName,
            role,
            storeId
        };

        return next();
    } catch (e) {
        logger.error('🔥 Error attaching user to req: %o', e);
        return next(e);
    }
};

module.exports = attachCurrentUser;
