'use strict';

var _ = require('lodash');
var Order = require('../models').Order;

exports.index = function(req, res) {
  Order.sync().then(function() {
    Order.findAll().then(function(result) {
      return res.status(200).json(result);
    });
  });
};