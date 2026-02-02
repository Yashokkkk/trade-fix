'use strict';

const categoryService = require('../services/categoryService');

const findAll = async (req, res, next) => {
  try {
    const categories = await categoryService.findAll(req.query.type);
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    await categoryService.deleteById(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, create, deleteById };
