class NotVerifiedError extends Error{
    constructor(message) {
        super(message);
        this.name = 'NotVerifiedError';
        this.date = new Date();
    }
}

module.exports = NotVerifiedError;
