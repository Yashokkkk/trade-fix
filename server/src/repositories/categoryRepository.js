'use strict';

const { Category } = require('../models');

const findAll = async (type) => {
  const where = type ? { type } : {};
  return Category.findAll({ where });
};

const findById = async (id) => {
  return Category.findByPk(id);
};

const create = async (data) => {
  return Category.create(data);
};

const deleteById = async (id) => {
  return Category.destroy({ where: { id } });
};

module.exports = { findAll, findById, create, deleteById };
