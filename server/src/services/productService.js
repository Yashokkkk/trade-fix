'use strict';

const productRepository = require('../repositories/productRepository');
const categoryRepository = require('../repositories/categoryRepository');
const AppError = require('../utils/AppError');

const create = async (data) => {
  const { name, description, price, categoryId } = data;

  if (!name) throw new AppError('Name is required', 400);
  if (!description) throw new AppError('Description is required', 400);
  if (price == null || price <= 0) throw new AppError('Price must be greater than 0', 400);
  if (!categoryId) throw new AppError('Category is required', 400);

  const category = await categoryRepository.findById(categoryId);
  if (!category || category.type !== 'product') {
    throw new AppError('Invalid category for product', 400);
  }

  return await productRepository.create(data);
};

const findAll = async (filters) => {
  return await productRepository.findAll(filters);
};

const findById = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

const updateById = async (id, data) => {
  if (data.categoryId) {
    const category = await categoryRepository.findById(data.categoryId);
    if (!category || category.type !== 'product') {
      throw new AppError('Invalid category for product', 400);
    }
  }

  const updated = await productRepository.updateById(id, data);
  if (!updated) throw new AppError('Product not found', 404);
  return await productRepository.findById(id);
};

const deleteById = async (id) => {
  const deleted = await productRepository.deleteById(id);
  if (!deleted) throw new AppError('Product not found', 404);
};

module.exports = { create, findAll, findById, updateById, deleteById };
