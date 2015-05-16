var Board = function(window) {
  'use strict';

  var util = {};

  // canvas
  var canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true
  });

  // control
  var state = 2;
  var color;
  var colorId = '';
  for (var i = 0, len = 17; i <= len; i++) {
    colorId += '#btn_color_' + i;
    if (i !== len)
      colorId += ',';
  }
  var $colorBtn = $(colorId);
  // var $picBtn = $('#btn_pic');
  var $pencilBtn = $('#btn_pencil');
  var $eraseBtn = $('#btn_erase');

  var init = function() {
    canvas.freeDrawingBrush.width = 10;
    canvas.backgroundColor = '#fff';
    $pencilBtn.removeClass('btn-default');
    $pencilBtn.addClass('btn-info');
    $pencilBtn.css('color', '#000');
    $('#btn_color_17').css('border', 'medium solid #eee');

    $colorBtn.click(function() {
      color = $(this).data('color');
      $('#btn_pencil').css('color', color);
      $colorBtn.css('border', '');
      $(this).css('border', 'medium solid #eee');
      if (state === 2)
        canvas.freeDrawingBrush.color = color;
    });

    // $picBtn.click(function() {
    //   changeBtnState(this);
    //   state = 1;
    //   changeCursor(1);
    // });

    $pencilBtn.click(function() {
      changeBtnState(this);
      state = 2;
      changeCursor(2);
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = 10;
    });

    $eraseBtn.click(function() {
      changeBtnState(this);
      state = 3;
      changeCursor(3);
      canvas.freeDrawingBrush.color = '#fff';
      canvas.freeDrawingBrush.width = 5;
    });
  };

  var changeBtnState = function(that) {
    if (state === 1) {
      $picBtn.removeClass('btn-info');
      $picBtn.addClass('btn-default');
      $(that).removeClass('btn-default');
      $(that).addClass('btn-info');
    } else if (state === 2) {
      $pencilBtn.removeClass('btn-info');
      $pencilBtn.addClass('btn-default');
      $(that).removeClass('btn-default');
      $(that).addClass('btn-info');
    } else if (state === 3) {
      $eraseBtn.removeClass('btn-info');
      $eraseBtn.addClass('btn-default');
      $(that).removeClass('btn-default');
      $(that).addClass('btn-info');
    }
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

  util.stamp = function(id) {};

  util.send = function(id) {
    var image = canvas.toDataURL({
      format: 'jpeg',
      quality: 0.6
    }).substr(23);
    Parse.initialize('t9O0Rx2CFi0HrNJivSR1P8d1BIOERB0ok0SDiWgP', 'vZGgWJb8uuVlXQBeXI9XZn0R6hNOXnLjwpH4SqLO');
    var ImageObject = Parse.Object.extend('Image');
    var imageObject = new ImageObject();
    imageObject.save({
      body: image,
      tag: [],
      userId: null,
      sentenceId: id
    }, {
      success: function(object) {
        $('#modal_title').text('成功');
        $('#modal_body').text('あなたの絵が投稿されました。');
        $('#modal').modal('show');
        $('#send').text('save');
        setTimeout(function() {
          location.href = "http://languagexpress.cloudapp.net";
        }, 2000);
      },
      error: function(model, error) {
        $('#modal_title').text('失敗');
        $('#modal_body').text('もう一度やり直してください。');
        $('#modal').modal('show');
        $('#send').text('save');
      }
    });
  };

  init();

  return util;
};
