/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var express = require('express'),
  router = express.Router(),
  index = require('../controllers/index.controller'),
  gallery = require('../controllers/gallery.controller.js'),
  board = require('../controllers/board.controller.js');

/* GET home page. */
router.get('/', index.read);
router.get('/gallery/:id([0-9]+)', gallery.read);
router.get('/board', board.read);

module.exports = router;
