'use strict';

const { Op } = require('sequelize');
const { Service, Category } = require('../models');

const categoryInclude = { model: Category, as: 'category', attributes: ['id', 'name'] };

const create = async (data) => {
  const service = await Service.create(data);
  return Service.findByPk(service.id, { include: [categoryInclude] });
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

  return Service.findAll({ where, include: [categoryInclude] });
};

const findById = async (id) => {
  return Service.findByPk(id, { include: [categoryInclude] });
};

const updateById = async (id, data) => {
  await Service.update(data, { where: { id } });
  return Service.findByPk(id, { include: [categoryInclude] });
};

const deleteById = async (id) => {
  return Service.destroy({ where: { id } });
};

module.exports = { create, findAll, findById, updateById, deleteById };
