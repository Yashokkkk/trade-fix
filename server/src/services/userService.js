"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");
const AppError = require("../utils/AppError");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined in environment variables');
const JWT_EXPIRES_IN = "7d";

const login = async (dto) => {
  const { login, password } = dto;

  if (!login || !password) {
    throw new AppError("Login and password required", 400);
  }

  const user = await userRepository.findByLogin(login);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      login: user.login,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return {
    accessToken: token,
  };
};

module.exports = {
  login,
};
