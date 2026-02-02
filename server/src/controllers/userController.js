"use strict";

const userService = require("../services/userService");
const { loginUserDto } = require("../dtos/userDto");

const login = async (req, res, next) => {
  try {
    const dto = loginUserDto(req.body);
    const data = await userService.login(dto);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
