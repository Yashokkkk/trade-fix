'use strict';

const { sequelize } = require('../config/db');

const User = require('./User')(sequelize);
const Category = require('./Category')(sequelize);
const Product = require('./Product')(sequelize);
const Service = require('./Service')(sequelize);
const Request = require('./Request')(sequelize);

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Category.hasMany(Service, { foreignKey: 'categoryId' });
Service.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Service.hasMany(Request, { foreignKey: 'serviceId' });
Request.belongsTo(Service, { foreignKey: 'serviceId' });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Service,
  Request,
};