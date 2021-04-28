const { DuplicateModelError, ModelNotFoundError } = require('../errors');

const s3 = require('../utils/s3');

const { AW3_S3_BUCKET_URL } = require('../configs');

class StoreService {
    constructor(container) {
        this.StoreModel = container.get('StoreModel');
        this.ProductModel = container.get('ProductModel');
        this.CategoryModel = container.get('CategoryModel');
        this.UserModel = container.get('UserModel');
    }

    async findAll() {
        return await this.StoreModel.find();
    }

    async findById(_id) {
        return await this.StoreModel.findOne({ _id });
    }

    async editConfigs(name, description, whatsappNumber, friendlyUrl, storeId) {

        // check if the store name or url already exist
        const storeFindOneExistingRecord = await this.StoreModel.findOne({ $or: [{ name }, { friendlyUrl }] });

        // check if the store is already created
        const storeFindOneRecord = await this.StoreModel.findOne({ _id: storeId });

        if (storeFindOneExistingRecord) {
            if (storeFindOneExistingRecord._id.toString() !== storeId.toString()) {
                throw new DuplicateModelError('Store name or friendly url already exist.');
            }
        }

        if (!storeFindOneRecord)
            throw new ModelNotFoundError('Store not found');
        
        return await storeFindOneRecord.updateOne(
            {
                name,
                description,
                whatsappNumber,
                friendlyUrl
            },
            { upsert: true }
        );
    }
    
    async editLogo(logo, storeId) {
        // check if the store is already created
        const storeFindOneRecord = await this.StoreModel.findOne({ _id: storeId });

        if (!storeFindOneRecord)
            throw new ModelNotFoundError('Store not found');

        // do not wait for this
        this.deleteOldLogoFromS3(storeFindOneRecord);

        const newLogoUrl = await this.saveNewLogoInS3(logo);
        
        await storeFindOneRecord.updateOne(
            {
                logoUrl: newLogoUrl,
               
            },
            { upsert: true }
        );

        return { newLogoUrl };
    }

    async findByFriendlyUrl(friendlyUrl) {
        // check if the store is already created
        const storeFindOneRecord = await this.StoreModel.findOne({ friendlyUrl })
            .select('name description logoUrl whatsappNumber');

        if (!storeFindOneRecord)
            throw new ModelNotFoundError('Store not found');


        const productsFindRecord = await this.ProductModel.find({ storeId: storeFindOneRecord._id })
            .select('name description pictureUrl price categoryId');
        const categoriesFindRecord = await this.CategoryModel.find({ storeId: storeFindOneRecord._id })
            .select('name');

        return {
            ...storeFindOneRecord._doc,
            products: productsFindRecord,
            categories: categoriesFindRecord
        };
    }

    async saveNewLogoInS3(logo) {
        // generate object key
        const key = s3.generateUniqueObjectKeyFromFile('logo', logo);

        await s3.putObject(key, logo.buffer, {
            dimensions: {
                width: 200,
                height: 200
            }
        });

        // generate new logo url
        return s3.generateObjectUrl(key);
    }

    deleteOldLogoFromS3(store) {
        try {
            const oldLogoKey = s3.getObjectKeyFromUrl(store.logoUrl);
            s3.deleteObject(oldLogoKey);
        } catch (e) {
            console.log("error ===>")
            console.log(e);
        }        
    }
    
}

module.exports = StoreService;
