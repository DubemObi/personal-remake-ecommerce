const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Enter product description"],
  },
  price: {
    type: String,
    required: [true, "Enter product price"],
  },
  quantity: {
    type: String,
    required: [true, "Enter product quantity"],
  },
  serialNo: {
    type: String,
    required: [true, "Enter product serial No."],
    unique: [true, "Product already exists"],
  },
});

module.exports = mongoose.model("product", productSchema);
