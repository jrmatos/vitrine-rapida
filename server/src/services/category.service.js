const { DuplicateModelError, ModelNotFoundError, MaxAmountOfResourceReachedError } = require('../errors');

const { MAX_AMOUNT_OF_CATEGORIES } = require('../configs');

class CategoryService {
    constructor(container) {
        this.CategoryModel = container.get('CategoryModel');
    }

    async findAll(storeId) {
        return await this.CategoryModel.find({ storeId });
    }

    async save(name, storeId) {
        // check if the category is already created
        const categoryFindOneRecord = await this.CategoryModel.findOne({ name, storeId });

        const amountOfCategoriesByStoreId = await this.CategoryModel.count({ storeId });

        if (categoryFindOneRecord)
            throw new DuplicateModelError('Category already exists.');

        if (amountOfCategoriesByStoreId >= MAX_AMOUNT_OF_CATEGORIES)
            throw new MaxAmountOfResourceReachedError(`Max amount of categories reached.`);

        // If the category does not exist yet, then we create it.
        return await this.CategoryModel.create({
            name,
            storeId
        });
    }

    async delete(_id, storeId) {
        // check if the category is already created
        const categoryFindOneRecord = await this.CategoryModel.findOne({ _id, storeId });

        if (!categoryFindOneRecord)
            throw new ModelNotFoundError('Category not found');

        return await categoryFindOneRecord.deleteOne();
    }

}

module.exports = CategoryService;
