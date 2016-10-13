'use strict';

module.exports = function(sequelize, DataTypes) {
  var Sequelize = sequelize.define('product', {
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    portion: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  return Sequelize;
};