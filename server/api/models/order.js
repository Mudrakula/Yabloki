'use strict';

module.exports = function(sequelize, DataTypes) {
  var Sequelize = sequelize.define('order', {
    time: DataTypes.BIGINT,
    products: DataTypes.TEXT,
    customer: DataTypes.STRING,
    bar_status: DataTypes.INTEGER,
    kitchen_status: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });

  return Sequelize;
};