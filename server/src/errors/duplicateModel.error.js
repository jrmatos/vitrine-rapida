class DuplicateModelError extends Error{
    constructor(message) {
        super(message);
        this.name = 'DuplicateModelError';
        this.date = new Date();
    }
}

module.exports = DuplicateModelError;
