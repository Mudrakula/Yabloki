'use strict';

var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/:type', controller.index);
router.post('/current', controller.getCurrent)
router.post('/', controller.create);
router.post('/update', controller.update);
router.post('/done', controller.complete);
router.post('/product_ready', controller.productReady);
module.exports = router;