const Product = require('../model/product');

module.exports = ProductCtrl = {
  getAll: async (req, res) => {
    Product.find()
      .sort({ price: 1 })
      .then((products) => {
        res.status(200).json({
          status: 200,
          total: products.length,
          data: products,
        });
      });
  },

  create: (req, res) => {
    Product.create(req.body).then(
      res
        .status(200)
        .json({ status: 200, message: 'Create a new product Successfully!!' })
    );
  },

  getById: async (req, res) => {
    const product = await Product.findById(req.params.productId);
    const { is_Delete, ...otherProduct } = product._doc;
    const review = await ReviewCtrl.GetReviewProduct(product.id);
    res.status(200).json({ status: 200, ...otherProduct, review });
  },

  update: (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, req.body)
      .then(res.json({ status: 200, message: 'Cập nhật thành công!!' }))
      .catch((err) =>
        res
          .status(400)
          .json({ status: 500, message: 'Cập nhật thất bại!!!', err })
      );
  },

  delete: (req, res) => {
    Product.findByIdAndDelete(req.params.productId)
      .then(res.json({ message: 'Xóa thành công!!' }))
      .catch((err) =>
        res.status(400).json({ status: 200, message: 'Xóa thất bại!!!', err })
      );
  },
};
