var Gallery = function(window) {
  'use strict';

  var util = {};

  var init = function() {
    Parse.initialize('t9O0Rx2CFi0HrNJivSR1P8d1BIOERB0ok0SDiWgP', 'vZGgWJb8uuVlXQBeXI9XZn0R6hNOXnLjwpH4SqLO');
  };

  var getSentence = function(id) {
    if (!id)
      return;
    var Sentence = Parse.Object.extend("Sentence");
    var query = new Parse.Query(Sentence);
    query.get(id, {
      success: function(object) {
        console.log(object);
        $('#modal_title').text(object._serverData.body);
      },
      error: function(object, error) {}
    });
  };

  var getUserName = function(id) {
    if (!id) {
      $('#modal_footer').text('名無し');
      return;
    }
    var User = Parse.Object.extend("_User");
    var query = new Parse.Query(User);
    query.get(id, {
      success: function(object) {
        console.log(object);
        $('#modal_footer').text(object._serverData.username);
      },
      error: function(object, error) {}
    });
  };

  util.view = function(userId, sentenceId) {
    getUserName(userId);
    getSentence(sentenceId);
  };

  init();

  return util;
};
