const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  quantity: {
    type: String,
    required: [true, "Enter product quantity"],
  },
});

module.exports = mongoose.model("order", orderSchema);
