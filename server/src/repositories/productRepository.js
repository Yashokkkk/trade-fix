'use strict';

const { Op } = require('sequelize');
const { Product, Category } = require('../models');

const categoryInclude = { model: Category, as: 'category', attributes: ['id', 'name'] };

const create = async (data) => {
  const product = await Product.create(data);
  return Product.findByPk(product.id, { include: [categoryInclude] });
};

const findAll = async (filters = {}) => {
  const where = {};

  if (filters.categoryId) {
    where.categoryId = parseInt(filters.categoryId);
  }

  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price[Op.gte] = parseFloat(filters.minPrice);
    if (filters.maxPrice) where.price[Op.lte] = parseFloat(filters.maxPrice);
  }

  return Product.findAll({ where, include: [categoryInclude] });
};

const findById = async (id) => {
  return Product.findByPk(id, { include: [categoryInclude] });
};

const updateById = async (id, data) => {
  await Product.update(data, { where: { id } });
  return Product.findByPk(id, { include: [categoryInclude] });
};

const deleteById = async (id) => {
  return Product.destroy({ where: { id } });
};

module.exports = { create, findAll, findById, updateById, deleteById };
