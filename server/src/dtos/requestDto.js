'use strict';

const createRequestDto = (data) => {
  return {
    clientName: data.clientName,
    clientContact: data.clientContact,
    serviceId: data.serviceId,
    description: data.description,
  };
};

const requestResponseDto = (request) => ({
  id: request.id,
  clientName: request.clientName,
  clientContact: request.clientContact,
  serviceId: request.serviceId,
  description: request.description,
  status: request.status,
});

module.exports = {
  createRequestDto,
  requestResponseDto,
};