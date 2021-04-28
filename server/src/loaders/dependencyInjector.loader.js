const { Container } = require('typedi');

// logger
const logger = require('../utils/logger');

// models
const {
    StoreModel,
    UserModel,
    CategoryModel,
    ProductModel
} = require('../models');

// services
const {
    HelloService,
    StoreService,
    AuthService,
    CategoryService,
    ProductService
} = require('../services/');

const dependencyInjectorLoader = (mongoConnection) => {
    // database connection
    Container.set('mongoConnection', mongoConnection);

    // logger
    Container.set('logger', logger);

    // load models (Models must load first since some services depend on them)
    Container.set([
        { id: 'StoreModel', value: StoreModel },
        { id: 'UserModel', value: UserModel },
        { id: 'CategoryModel', value: CategoryModel },
        { id: 'ProductModel', value: ProductModel }
    ]);

    // load services
    Container.set([
        { id: 'StoreService', value: new StoreService(Container) },
        { id: 'HelloService', value: new HelloService(Container) },
        { id: 'AuthService', value: new AuthService(Container) },
        { id: 'CategoryService', value: new CategoryService(Container) },
        { id: 'ProductService', value: new ProductService(Container) }
    ]);
};

module.exports = dependencyInjectorLoader;
