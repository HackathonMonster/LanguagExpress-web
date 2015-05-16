/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var express = require('express'),
  router = express.Router(),
  index = require('../controllers/index.controller'),
  draw = require('../controllers/draw.controller.js');

/* GET home page. */
router.get('/', index.read);
router.get('/draw', draw.read);

module.exports = router;
