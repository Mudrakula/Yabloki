'use strict';

var _ = require('lodash');
var Product = require('../models').Product;

exports.index = function(req, res) {
  Product.sync().then(function() {
    Product.findAll().then(function(result) {
      return res.status(200).json(result);
    });
  }, function(error) {
    console.log(error);
  });
};