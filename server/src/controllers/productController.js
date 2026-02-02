'use strict';

const fs = require('fs');
const path = require('path');

const productService = require('../services/productService');
const AppError = require('../utils/AppError');

const { createProductDto, productResponseDto } = require('../dtos/productDto');

const create = async (req, res, next) => {
  try {
    const dto = createProductDto(req.body, req.file);

    const product = await productService.create(dto);
    res.status(201).json(productResponseDto(product));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const products = await productService.findAll(req.query);
    res.json(products.map(productResponseDto));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const product = await productService.findById(req.params.id);
    res.json(productResponseDto(product));
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await productService.findById(req.params.id);
      if (existing.image) {
        const oldPath = path.join(__dirname, '../../', existing.image);
        fs.unlink(oldPath, () => {});
      }
      data.image = `/uploads/${req.file.filename}`;
    }
    const product = await productService.updateById(req.params.id, data);
    res.json(productResponseDto(product));
  } catch (err) {
    next(err);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Image is required', 400);

    const existing = await productService.findById(req.params.id);
    if (existing.image) {
      const oldPath = path.join(__dirname, '../../', existing.image);
      fs.unlink(oldPath, () => {});
    }

    const product = await productService.updateById(req.params.id, {
      image: `/uploads/${req.file.filename}`,
    });
    res.json(productResponseDto(product));
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const existing = await productService.findById(req.params.id);
    if (existing.image) {
      const oldPath = path.join(__dirname, '../../', existing.image);
      fs.unlink(oldPath, () => {});
    }

    await productService.deleteById(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  uploadImage,
  deleteById,
};