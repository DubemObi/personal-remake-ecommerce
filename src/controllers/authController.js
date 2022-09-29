const express = require("express");
const User = require("../models/userModel");
const ErrorHandler = require("../helpers/errorHandler");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "dubem secret string", {
    expiresIn: maxAge,
  });
};

exports.userSignup = async (request, response) => {
  const requestBody = request.body;
  const findEmail = await User.findOne({ email: requestBody.email });
  try {
    if (findEmail) {
      return response.status(409).send({
        status: false,
        message: "Email already exists",
      });
    } else {
      const user = new User(requestBody);
      await user.save();
      return response.status(201).send({
        status: true,
        message: "Account has been  created successfully",
        newUser: user,
      });
    }
  } catch (error) {
    const err = ErrorHandler.handleErrors(error);
    return response.status(404).json({ err });
  }
};

exports.userLogin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    response.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    response.status(200).json({ user });
  } catch (err) {
    const error = ErrorHandler.handleErrors(err);
    response.status(400).json({ error });
  }
};

exports.updateUserPassword = async (request, response) => {
  try {
    const { id } = request.query;
    const findUser = await User.findById(id);
    findUser.password = request.body.password;
    await findUser.save();
    return response.status(200).send({
      status: true,
      message: "Account has been updated successfully",
      updatedUser: findUser,
    });
  } catch (err) {
    const error = ErrorHandler.handleErrors(err);
    response.status(404).json({ error });
  }
};
