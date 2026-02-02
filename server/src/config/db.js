"use strict";
const { Sequelize } = require("sequelize");

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
  throw new Error('Missing required database environment variables (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST)');
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
);

const connectDB = async () => {
  await sequelize.authenticate();
  console.log("Database connected");
};

module.exports = { sequelize, connectDB };
