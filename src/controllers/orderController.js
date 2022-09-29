const express = require("express");
const Order = require("../models/orderModel");
const ErrorHandler = require("../helpers/errorHandler");

exports.createOrder = async (request, response) => {
  const requestBody = request.body;
  try {
    const cart = new Order(requestBody);
    await cart.save();
    return response.status(201).send({
      status: true,
      message: "Order has been created succesfully",
      newBlog: cart,
    });
  } catch (err) {
    const error = ErrorHandler.handleErrors(err);
    return response.status(401).send({ error });
  }
};

exports.updateOrder = async (request, response) => {
  try {
    const { id } = request.query;
    const findOrder = await Order.findById(id);
    findOrder.quantity = request.body.quantity;
    await findOrder.save();
    return response.status(200).send({
      status: true,
      message: "Order has been updated successfully",
      updatedUser: findOrder,
    });
  } catch (err) {
    const error = ErrorHandler.handleErrors(err);
    return response.status(401).send({ error });
  }
};

exports.getOrder = async (request, response) => {
  try {
    const id = request.params.id;
    const findOneOrder = await Order.findById(id);

    if (!findOneOrder) {
      return response.status(404).send({
        status: false,
        message: "Order not found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "Order found",
        User: findOneOrder,
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

exports.getAllOrders = async (request, response) => {
  try {
    const findAllOrders = await User.find();
    return response.status(200).send({
      status: true,
      message: "Orders found",
      AllUsers: findAllOrders,
    });
  } catch {
    response.status(400).send({
      status: false,
      message: "No Orders found",
    });
  }
};

exports.deleteOrder = async (request, response) => {
  const { id } = request.query;
  const findOrder = await User.findByIdAndDelete(id);
  if (findOrder) {
    return response.status(200).send({
      status: true,
      message: "Order deleted successfully",
      deletedUser: findOrder,
    });
  } else {
    return response.status(404).send({
      status: false,
      message: "Order not found",
    });
  }
};
