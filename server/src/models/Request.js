'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Request', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    clientContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM('new', 'in_progress', 'completed'),
      defaultValue: 'new',
    },
  }, {
    tableName: 'requests',
    timestamps: false,
  });
};