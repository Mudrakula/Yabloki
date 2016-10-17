'use strict';

module.exports = function(sequelize, DataTypes) {
  var Sequelize = sequelize.define('order', {
    time: DataTypes.BIGINT,
    products: DataTypes.TEXT,
    customer: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  return Sequelize;
};