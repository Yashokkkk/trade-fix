'use strict';

const serviceRepository = require('../repositories/serviceRepository');
const categoryRepository = require('../repositories/categoryRepository');
const AppError = require('../utils/AppError');

const create = async (data) => {
  const { name, price, categoryId } = data;

  if (!name) throw new AppError('Name is required', 400);
  if (price == null || price <= 0) throw new AppError('Price must be greater than 0', 400);
  if (!categoryId) throw new AppError('Category is required', 400);

  const category = await categoryRepository.findById(categoryId);
  if (!category || category.type !== 'service') {
    throw new AppError('Invalid category for service', 400);
  }

  return await serviceRepository.create(data);
};

const findAll = async (filters) => {
  return await serviceRepository.findAll(filters);
};

const findById = async (id) => {
  const service = await serviceRepository.findById(id);
  if (!service) throw new AppError('Service not found', 404);
  return service;
};

const updateById = async (id, data) => {
  if (data.categoryId) {
    const category = await categoryRepository.findById(data.categoryId);
    if (!category || category.type !== 'service') {
      throw new AppError('Invalid category for service', 400);
    }
  }

  const updated = await serviceRepository.updateById(id, data);
  if (!updated) throw new AppError('Service not found', 404);
  return await serviceRepository.findById(id);
};

const deleteById = async (id) => {
  const deleted = await serviceRepository.deleteById(id);
  if (!deleted) throw new AppError('Service not found', 404);
};

module.exports = { create, findAll, findById, updateById, deleteById };
