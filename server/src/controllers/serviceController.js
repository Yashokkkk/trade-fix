'use strict';

const serviceService = require('../services/serviceService');
const { createServiceDto, serviceResponseDto } = require('../dtos/serviceDto');

const create = async (req, res, next) => {
  try {
    const dto = createServiceDto(req.body);
    const service = await serviceService.create(dto);
    res.status(201).json(serviceResponseDto(service));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const services = await serviceService.findAll(req.query);
    res.json(services.map(serviceResponseDto));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const service = await serviceService.findById(req.params.id);
    res.json(serviceResponseDto(service));
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const service = await serviceService.updateById(req.params.id, req.body);
    res.json(serviceResponseDto(service));
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    await serviceService.deleteById(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};