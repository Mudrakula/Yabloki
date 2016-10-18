'use strict';

var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/:type', controller.index);
router.post('/', controller.create);
router.post('/done', controller.complete);
module.exports = router;