const express = require("express");
const mongoose = require("mongoose");
const User = require("./src/routes/userRoutes");
const Auth = require("./src/routes/authRoute");
const Product = require("./src/routes/productRoutes");
const Order = require("./src/routes/orderRoutes");
const cookieParser = require("cookie-parser");
require("dotenv/config");

const app = express();
const PORT = 3020;

app.use(express.json());

app.use("/", User);
app.use("/", Auth);
app.use("/", Product);
app.use("/", Order);

app.use(cookieParser());

mongoose.connect(process.env.mongoDB);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
