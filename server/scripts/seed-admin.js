"use strict";
require("dotenv").config();

const bcrypt = require("bcrypt");
const { sequelize, User } = require("../src/models");

async function seedAdmin() {
  await sequelize.authenticate();

  const login = process.env.ADMIN_LOGIN;
  const password = process.env.ADMIN_PASSWORD;

  if (!login || !password) {
    throw new Error("ADMIN_LOGIN and ADMIN_PASSWORD must be set in .env");
  }

  const hash = await bcrypt.hash(password, 10);

  const [, created] = await User.findOrCreate({
    where: { login },
    defaults: { password: hash },
  });

  console.log(created ? `Admin "${login}" created` : `Admin "${login}" already exists`);
  await sequelize.close();
}

seedAdmin().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
