'use strict';

module.exports = function(sequelize, DataTypes) {
  var Sequelize = sequelize.define('category', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('bar', 'dish')
  }, {
    freezeTableName: true
  });

  return Sequelize;
};