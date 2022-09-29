const express = require("express");
const Product = require("../models/productModel");
const ErrorHandler = require("../helpers/errorHandler");

exports.createProduct = async (request, response) => {
  const requestBody = request.body;
  try {
    const item = new Product(requestBody);
    await item.save();
    return response.status(201).send({
      status: true,
      message: "Product has been created succesfully",
      newBlog: item,
    });
  } catch (err) {
    const error = ErrorHandler.handleErrors(err);
    return response.status(401).json({ error });
  }
};

exports.updateProduct = async (request, response) => {
  try {
    const { id } = request.query;
    const findProduct = await Product.findById(id);
    findProduct.name = request.body.name;
    findProduct.description = request.body.description;
    findProduct.price = request.body.price;
    await findProduct.save();
    return response.status(200).send({
      status: true,
      message: "Account has been updated successfully",
      updatedUser: findProduct,
    });
  } catch (err) {
    const error = ErrorHandler.handleErrors(err);
    return response.status(401).json({ error });
  }
};

exports.getProduct = async (request, response) => {
  try {
    const id = request.params.id;
    const findOneProduct = await Product.findById(id);

    if (!findOneProduct) {
      return response.status(404).send({
        status: false,
        message: "Product not found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "Product found",
        User: findOneProduct,
      });
    }
  } catch (err) {
    if (err.path === "_id") {
      return response.status(401).send({
        status: false,
        message: "Invalid ID",
      });
    } else {
      return response.status(500).send({
        status: false,
        message: "Server Error",
      });
    }
  }
};

exports.getAllProducts = async (request, response) => {
  try {
    const findAllProducts = await Product.find();
    return response.status(200).send({
      status: true,
      message: "Products found",
      AllUsers: findAllProducts,
    });
  } catch {
    response.status(404).send({
      status: false,
      message: "No products found",
    });
  }
};

exports.deleteProduct = async (request, response) => {
  const { id } = request.query;
  const findProduct = await Product.findByIdAndDelete(id);
  if (findProduct) {
    return response.status(200).send({
      status: true,
      message: "Product deleted successfully",
      deletedUser: findProduct,
    });
  } else {
    return response.status(404).send({
      status: false,
      message: "Product not found",
    });
  }
};
