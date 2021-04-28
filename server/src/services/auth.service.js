const jwt = require('jsonwebtoken');
const uniqueString = require('unique-string');
const Base64 = require('js-base64');
const bcrypt = require('bcrypt');

const { sendConfirmationCode } = require('../utils/mail');

const logger = require('../utils/logger');

const { 
    DuplicateModelError,
    ModelNotFoundError,
    SignInError,
    NotVerifiedError
} = require('../errors/');

const { JWT_SECRET, JWT_EXPIRATION, SALT_ROUNDS, NODE_ENV } = require('../configs');


function getDefaultStoreData() {
    const timestamp = new Date().getTime();

    return {
        name: `Loja ${timestamp}`,
        logoUrl: 'https://i.postimg.cc/0j6bS1tC/teatro-amazonas.jpg',
        description: 'End: Largo de São Sebastião - Centro, Manaus - AM, 69067-080',
        whatsappNumber: '92988888888',
        friendlyUrl: `loja-${timestamp}`
    };
}

class AuthService {
    constructor(container) {
        this.UserModel = container.get('UserModel');
        this.StoreModel = container.get('StoreModel');
    }

    async signUp(firstName, lastName, email, password) {
        // first and foremost, check if the user already exists
        const userAlreadyExist = await this.UserModel.findOne({ email });
        if (userAlreadyExist) throw new DuplicateModelError('User already exists.');

        // encrypt user password
        const passwordHashed = await bcrypt.hash(password, SALT_ROUNDS);

        // create store
        const storeRecord = await this.StoreModel.create(getDefaultStoreData());

        // generate email verification code
        const emailVerificationCode = this.generateCombinedConfirmationCode(email);

        // create user
        const userRecord = await this.UserModel.create({
            firstName,
            lastName,
            email,
            
            password: passwordHashed,
            emailVerificationCode,

            role: 'store-admin',
            storeId: storeRecord._id
        });

        if (NODE_ENV === 'production') {
            // send confirmation email
            await sendConfirmationCode(email, emailVerificationCode);
        }

        return {
            userCreated: { 
                firstName: userRecord.firstName,
                lastName: userRecord.lastName,
                email: userRecord.email,
                role: userRecord.role,
                storeId: userRecord.storeId
            }
        };
    }

    async signIn(email, password) {
        const userRecord = await this.UserModel.findOne({ email });

        if (!userRecord) {
            throw new ModelNotFoundError('User not found.');
        } else {
            const correctPassword = await bcrypt.compare(password, userRecord.password);

            if (!correctPassword) {
                throw new SignInError('Incorrect password.');
            }
        }

        if (!userRecord.emailVerified) {
            throw new NotVerifiedError('E-mail not verified.');
        }

        return {
            user: {
                _id: userRecord._id,
                email: userRecord.email,
                firstName: userRecord.firstName,
                lastName: userRecord.lastName,
                role: userRecord.role,
                storeId: userRecord.storeId
            },
            token: this.generateJWT(userRecord),
        }
    }

    async emailConfirmation(confirmationCode) {
        const decodedCode = Base64.decode(confirmationCode);
        const [email, code] = decodedCode.split(':');

        logger.info(`Confirming email ${email} with code ${code}`);

        const userRecord = await this.UserModel.findOne({ email });

        if (
            userRecord &&
            !userRecord.emailVerified &&
            userRecord.emailVerificationCode === confirmationCode
        ) {
            await userRecord.updateOne({
                emailVerified: true
            });

            return 'Confirmation succeed.';
        }

        throw new Error('Confirmation did not succeeed.');
    }

    generateJWT({ _id, firstName, lastName, email, role, storeId }) {
        return jwt.sign(
            { _id, firstName, lastName, email, role, storeId },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );
    }

    generateCombinedConfirmationCode(email) {
        return Base64.encode(`${email}:${uniqueString()}`);
    }

}

module.exports = AuthService;
