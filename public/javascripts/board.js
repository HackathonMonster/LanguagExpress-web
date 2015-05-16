var Board = function(window) {
  "use strict";

  var util = {};

  // svg
  var $board = $('#board'),
    svg = {},
    width = 600,
    height = 600;

  // canvas
  var $canvas = $('#canvas');

  // 0: null, 1: pic, 2: pencil, 3: erase
  var state = 0;
  var strokeColor = '#000';

  // control
  var $colorBtn = $('#btn_color_000, #btn_color_f00, #btn_color_0f0, #btn_color_00f, #btn_color_ff0, #btn_color_f0f, #btn_color_0ff, #btn_color_fff');
  var $picBtn = $('#btn_pic');
  var $pencilBtn = $('#btn_pencil');
  var $eraseBtn = $('#btn_erase');

  var init = function() {

    svg = d3.select('#board')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    $colorBtn.click(function() {
      var color = $(this).data('color');
      $('#btn_pencil').css('color', color);
      strokeColor = color;
    });

    $picBtn.click(function() {
      state = 1;
      changeCursor(state);
    });

    $pencilBtn.click(function() {
      state = 2;
      changeCursor(state);

    });

    $eraseBtn.click(function () {
      state = 3;
      changeCursor(state);
    });
  };

  var changeCursor = function(state) {
    if (state === 1) {
      // $board.css('cursor', 'a');
    } else if (state === 2) {
      // $board.css('cursor', 'a');
    } else if (state === 3) {
      // $board.css('cursor', 'a');
    } else {
      $board.css('cursor', 'auto');
    }
  };

  util.setState = function() {

  };

  util.draw = function() {
    svg.append('text')
      .text('this is test test')
      .attr('x', 100)
      .attr('y', 100)
      .attr('font-size', 32);
  };

  util.erase = function() {

  };

  util.stamp = function(id) {

  };

  var convert = function() {
    var svg = document.querySelector('svg');
    var svgData = new XMLSerializer().serializeToString(svg);
    var imgsrc = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    var image = new Image();
    image.src = imgsrc;
    return image;
  };

  util.send = function() {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    var image = convert();

    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      var canvasdata = canvas.toDataURL('image/png');
      Parse.initialize("t9O0Rx2CFi0HrNJivSR1P8d1BIOERB0ok0SDiWgP", "vZGgWJb8uuVlXQBeXI9XZn0R6hNOXnLjwpH4SqLO");
      var ImageObject = Parse.Object.extend('Image');
      var imageObject = new ImageObject();
      imageObject.save({
        body: 'data:image/png;base64,' + canvasdata.replace(/^.*,/, ''),
        tag: [],
        userId: null,
        sentenceId: null
      }, {
        success: function(object) {
          console.log(object);
        },
        error: function(model, error) {
          console.log(error);
        }
      });
    };
  };

  init();

  return util;
};
