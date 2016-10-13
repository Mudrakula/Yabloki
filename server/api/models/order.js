'use strict';

module.exports = function(sequelize, DataTypes) {
  var Sequelize = sequelize.define('order', {
    time: DataTypes.BIGINT,
    products: DataTypes.STRING,
    customer: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  return Sequelize;
};