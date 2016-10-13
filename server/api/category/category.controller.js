'use strict';

var _ = require('lodash');
var Category = require('../models').Category;

exports.index = function(req, res) {
  Category.sync().then(function() {
    Category.findAll().then(function(result) {
      return res.status(200).json(result);
    });
  });
};