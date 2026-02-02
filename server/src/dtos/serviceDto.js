'use strict';

const createServiceDto = (data) => {
  return {
    name: data.name,
    description: data.description,
    categoryId: data.categoryId,
    price: data.price,
  };
};

const serviceResponseDto = (service) => ({
  id: service.id,
  name: service.name,
  description: service.description,
  category: service.category ? { id: service.category.id, name: service.category.name } : null,
  price: service.price,
});

module.exports = { createServiceDto, serviceResponseDto };
