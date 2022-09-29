const express = require("express");
const ProductController = require("../controllers/productController");
const app = express();

app.use(express.json());
const router = express.Router();

const {
  createProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
} = ProductController;
router
  .route("/product")
  .post(createProduct)
  .put(updateProduct)
  .get(getAllProducts)
  .delete(deleteProduct);

router.route("/product/:id").get(getProduct);

module.exports = router;
