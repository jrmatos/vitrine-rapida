const s3 = require('../utils/s3');

const { DuplicateModelError, ModelNotFoundError, MaxAmountOfResourceReachedError } = require('../errors');

const { MAX_AMOUNT_OF_PRODUCTS } = require('../configs');

class ProductService {
    constructor(container) {
        this.ProductModel = container.get('ProductModel');
    }

    async findAll(storeId) {
        return await this.ProductModel.find({ storeId });
    }

    async save(name, description, picture, price, categoryId, storeId) {
        // check if the product is already created
        const productFindOneRecord = await this.ProductModel.findOne({ name, storeId });

        const amountOfProductsByStoreId = await this.ProductModel.count({ storeId });

        if (amountOfProductsByStoreId >= MAX_AMOUNT_OF_PRODUCTS)
            throw new MaxAmountOfResourceReachedError(`Max amount of products reached.`);
        
        if (productFindOneRecord)
            throw new DuplicateModelError('Product already exists.');

        // generate picture url
        const key = s3.generateUniqueObjectKeyFromFile('product', picture);

        // generate picture url
        const pictureUrl = s3.generateObjectUrl(key);

        // save picture on s3
        await s3.putObject(key, picture.buffer, {
            dimensions: {
                width: 285,
                height: 185
            }
        });

        // If the product does not exist yet, then we create it.
        return await this.ProductModel.create({
            name, description, pictureUrl, price, categoryId, storeId
        });
    }

    async delete(_id, storeId) {
        // check if the product is already created
        const productFindOneRecord = await this.ProductModel.findOne({ _id, storeId });

        if (!productFindOneRecord)
            throw new ModelNotFoundError('Product not found');

        // get s3 object key
        const key = s3.getObjectKeyFromUrl(productFindOneRecord.pictureUrl)

        // delete picture from s3 to clear storage
        await s3.deleteObject(key);

        return await productFindOneRecord.deleteOne();
    }
}

module.exports = ProductService;
