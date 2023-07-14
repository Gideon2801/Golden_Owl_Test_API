const productController = require('../controller/productController');

module.exports = function (app) {
  app
    .route('/product')
    .get(productController.getAll)
    .post(productController.create);

  app
    .route('/product/:productId')
    .get(productController.getById)
    .put(productController.update)
    .delete(productController.delete);
};
