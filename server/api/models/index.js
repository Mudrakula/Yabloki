'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize('yablokidb', 'root', 'ilovezp', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
});

module.exports.Category = require(__dirname + '/category')(sequelize, Sequelize);
module.exports.Product = require(__dirname + '/product')(sequelize, Sequelize);
module.exports.Order = require(__dirname + '/order')(sequelize, Sequelize);
module.exports.sequelize = sequelize;