"use strict";

const loginUserDto = (data) => {
  return {
    login: data.login,
    password: data.password,
  };
};

module.exports = {
  loginUserDto,
};
