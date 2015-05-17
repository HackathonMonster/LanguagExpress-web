/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var request = require('request'),
  config = require('../config.json');

var getSentence = function(callback) {
  var options = {
    url: 'https://api.parse.com/1/classes/Sentence',
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
  getSentence(function(error, response, body) {
    var json = JSON.parse(body);
    var rndIndex = parseInt(Math.random() * json.results.length, 10);

    res.render('board', {
      og_type: 'article',
      title: config.title,
      og_image: config.og_image,
      og_url: config.url,
      og_description: config.og_description,
      sentence: json.results[rndIndex].body,
      sentenceId: json.results[rndIndex].objectId
    });
  });
};
