'use strict';

const createProductDto = (data, file) => {
  return {
    name: data.name,
    description: data.description,
    price: data.price,
    categoryId: data.categoryId,
    image: file ? `/uploads/${file.filename}` : undefined,
  };
};

const productResponseDto = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category ? { id: product.category.id, name: product.category.name } : null,
  image: product.image ?? null,
});

module.exports = { createProductDto, productResponseDto };
