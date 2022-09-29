const express = require("express");
const OrderController = require("../controllers/orderController");
const app = express();

app.use(express.json());
const router = express.Router();

const { createOrder, updateOrder, getOrder, getAllOrders, deleteOrder } =
  OrderController;
router
  .route("/order")
  .post(createOrder)
  .put(updateOrder)
  .get(getAllOrders)
  .delete(deleteOrder);

router.route("/order/:id").get(getOrder);

module.exports = router;
