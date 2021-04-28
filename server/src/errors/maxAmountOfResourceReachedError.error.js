class MaxAmountOfResourceReachedError extends Error{
    constructor(message) {
        super(message);
        this.name = 'MaxAmountOfResourceReachedError';
        this.date = new Date();
    }
}

module.exports = MaxAmountOfResourceReachedError;
