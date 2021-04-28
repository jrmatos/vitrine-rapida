class ModelNotFoundError extends Error{
    constructor(message) {
        super(message);
        this.name = 'ModelNotFoundError';
        this.date = new Date();
    }
}

module.exports = ModelNotFoundError;
