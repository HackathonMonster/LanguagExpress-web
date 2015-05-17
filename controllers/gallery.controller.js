/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var request = require('request'),
  config = require('../config.json');

var imageNum = 9;

var getImage = function(skip, callback) {
  var query = 'order=-createdAt&limit=' + imageNum + '&skip=' + (imageNum * skip);
  var options = {
    url: 'https://api.parse.com/1/classes/Image?' + query,
    headers: {
      'X-Parse-Application-Id': config.parseApplicationId,
      'X-Parse-REST-API-Key': config.parseAPIKey,
    }
  };
  request(options, callback);
};

/**
 * Read
 */
exports.read = function(req, res) {
  var skip = 0;
  if (req.params.id) {
    skip = parseInt(req.params.id, 10);
  }
  getImage(skip, function(error, response, body) {
    var json = {};
    if (!error) {
      json = JSON.parse(body);
    }
    var previous = skip - 1;
    var previous_url = '#';
    if (0 <= previous) {
      previous_url = config.url + '/gallery/' + previous;
    }
    var next = skip + 1;
    var next_url = '#';
    if (json.results.length === 9) {
      next_url = config.url + '/gallery/' + next;
    }

    res.render('gallery', {
      og_type: 'article',
      title: config.title,
      og_image: config.og_image,
      og_url: config.url,
      og_description: config.og_description,
      galleries: json.results,
      previous: previous_url,
      next: next_url
    });
  });
};
