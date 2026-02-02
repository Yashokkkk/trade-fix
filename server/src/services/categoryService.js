'use strict';

const categoryRepository = require('../repositories/categoryRepository');
const AppError = require('../utils/AppError');

const VALID_TYPES = ['product', 'service'];

const findAll = async (type) => {
  if (type && !VALID_TYPES.includes(type)) {
    throw new AppError('Type must be "product" or "service"', 400);
  }
  return categoryRepository.findAll(type);
};

const create = async (data) => {
  const { name, type } = data;
  if (!name) throw new AppError('Name is required', 400);
  if (!VALID_TYPES.includes(type)) throw new AppError('Type must be "product" or "service"', 400);
  return categoryRepository.create({ name, type });
};

const deleteById = async (id) => {
  const deleted = await categoryRepository.deleteById(id);
  if (!deleted) throw new AppError('Category not found', 404);
};

module.exports = { findAll, create, deleteById };
