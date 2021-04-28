class SignInError extends Error{
    constructor(message) {
        super(message);
        this.name = 'SignInError';
        this.date = new Date();
    }
}

module.exports = SignInError;
