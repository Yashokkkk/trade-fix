"use strict";

const { User } = require("../models");

const findByLogin = async (login) => {
  return await User.findOne({
    where: { login },
  });
};

module.exports = {
  findByLogin,
};
