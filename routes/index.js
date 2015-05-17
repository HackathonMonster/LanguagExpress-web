/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var express = require('express'),
  router = express.Router(),
  index = require('../controllers/index.controller'),
  board = require('../controllers/board.controller.js');

/* GET home page. */
router.get('/', index.read);
router.get('/board', board.read);

module.exports = router;
