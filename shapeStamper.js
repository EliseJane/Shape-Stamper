$(function() {
  var canvas = $("canvas")[0];
  var context = canvas.getContext('2d');
  var method;
  var side = 30;
  var $color = $("input[type=text]");
  var density;

  var drawing_methods = {
    square: function(e) {
      var x = e.offsetX - side / 2;
      var y = e.offsetY - side / 2;
      if (density === 'fill') {
        context.fillRect(x, y, side, side);
      } else {
        context.strokeRect(x, y, side, side);
      }
    },
    circle: function(e) {
      var x = e.offsetX;
      var y = e.offsetY;
      context.beginPath();
      context.arc(x, y, side / 2, 0, 2 * Math.PI);
      if (density === 'fill') {
        context.fill();
      } else {
        context.stroke();
      }
      context.closePath();
    },
    triangle: function(e) {
      var x = e.offsetX;
      var y = e.offsetY - side / 2;

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + side / 2, y + side);
      context.lineTo(x - side / 2, y + side);
      context.lineTo(x, y);
      if (density === 'fill') {
        context.fill();
      } else {
        context.stroke();
      }
      context.closePath();
    },
    star: function(e) {
      var x = e.offsetX;
      var y = e.offsetY - side / 2;

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + side / 3, y + side);
      context.lineTo(x - side / 2, y + side / 3);
      context.lineTo(x + side / 2, y + side / 3);
      context.lineTo(x - side / 3, y + side);
      context.lineTo(x, y);
      if (density === 'fill') {
        context.fill();
      } else {
        context.stroke();
      }
      context.closePath();
    },
    clear: function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
  };

  $(".drawing_method").on("click", function(e) {
    e.preventDefault();
    var $anchor = $(this);
    $anchor.closest("ul").find(".active").removeClass('active');
    $anchor.addClass('active');
    method = $anchor.attr("data-method");
  }).eq(0).click();

  $("#clear").on("click", function(e) {
    e.preventDefault();
    drawing_methods.clear();
  });

  $("input[type=radio]").on("click", function() {
    $radio = $(this);
    density = $radio.attr("data-density");
  }).eq(0).click();

  $("canvas").on("click", function(e) {
    context.fillStyle = $color.val();
    context.strokeStyle = $color.val();
    drawing_methods[method](e);
  });
});