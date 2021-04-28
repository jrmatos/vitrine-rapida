const { Router } = require('express');
const storeRouter = require('./routes/store.router');
const helloRouter = require('./routes/hello.router');
const authRouter = require('./routes/auth.router');
const categoryRouter = require('./routes/category.router');
const productRouter = require('./routes/product.router');

module.exports = () => {
    const app = Router();
    
    // register routers
    storeRouter(app);
    helloRouter(app);
    authRouter(app);
    categoryRouter(app);
    productRouter(app);

	return app;
}