'use strict';

const requestRepository = require('../repositories/requestRepository');
const serviceRepository = require('../repositories/serviceRepository');
const AppError = require('../utils/AppError');

const create = async (data) => {
  const { clientName, clientContact, serviceId, description } = data;

  if (!clientName || !clientContact || !serviceId || !description) {
    throw new AppError('Missing required fields', 400);
  }

  const service = await serviceRepository.findById(serviceId);

  if (!service) {
    throw new AppError(`Service with id ${serviceId} not found`, 404);
  }

  return await requestRepository.create({
    clientName,
    clientContact,
    serviceId,
    description,
    status: 'new',
  });
};

const findAll = async () => {
  return await requestRepository.findAll();
};

const findById = async (id) => {
  const request = await requestRepository.findById(id);

  if (!request) {
    throw new AppError('Request not found', 404);
  }

  return request;
};

const ALLOWED_STATUSES = ['new', 'in_progress', 'completed'];

const updateById = async (id, data) => {
  const { status } = data;

  if (!status) {
    throw new AppError('Status is required', 400);
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    throw new AppError(`Invalid status. Allowed: ${ALLOWED_STATUSES.join(', ')}`, 400);
  }

  const updated = await requestRepository.updateById(id, { status });

  if (!updated) {
    throw new AppError('Request not found', 404);
  }

  return requestRepository.findById(id);
};

const deleteById = async (id) => {
  const deleted = await requestRepository.deleteById(id);

  if (!deleted) {
    throw new AppError('Request not found', 404);
  }

  return;
};

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};