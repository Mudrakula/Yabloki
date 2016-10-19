'use strict';

var _ = require('lodash');
var Order = require('../models').Order;

exports.index = function(req, res) {
  Order.sync().then(function() {
    var field = req.params.type + '_status';
    Order.findAll({
      where: {[field]: 0}
    }).then(function(result) {
      return res.status(200).json(result);
    });
  });
};

exports.create = function(req, res) {
  Order.sync().then(function() {
    Order.create(req.body).then(function() {
      return res.status(200).send('success');
    });
  });
};

exports.productReady = function(req, res) {
  Order.sync().then(function() {
    Order.update({
      products: req.body.products,
      [req.body.type]: req.body.status
    }, {
      where: {id: req.body.order}
    }).then(function(result) {
      return res.status(200).send('success');
    });
  });
};

exports.complete = function(req, res) {
  Order.sync().then(function() {
    Order.update({
      [req.body.type]: 1
    }, {
      where: {id: req.body.id}
    }).then(function(result) {
      return res.status(200).send('success');
    });
  });
};