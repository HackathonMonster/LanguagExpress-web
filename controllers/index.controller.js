/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var config = require('../config.json');

/**
 * Read
 */
exports.read = function(req, res) {
  res.render('index', {
    og_type: 'website',
    title: config.title,
    og_image: config.og_image,
    og_url: config.url,
    og_description: config.og_description,
  });
};
