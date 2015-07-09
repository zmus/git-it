/* -----------------------------------------------------------------------------
                          $.each() with JSON
----------------------------------------------------------------------------- */

$(function () {

  // .one => executed at most once per element
  $('button').one('click', function () {
    $.ajax('/cities/favorite', {
      contentType: 'application/json',
      dataType: 'json', 
      success: function (res) {
        $.each(res, function (index, city) {
          $('<div/>').addClass('.favorite-' + index)
                     .append($('<p/>', { html: city.name}))
                     .append($('<img>', { src: city.image }))
                     .appendTo('.favorite');
        });
        $('.favorite img').width('50%');
      }
    });
  });

  $('button').on('click', function () {
    $('.favorite>div').toggle();
  });
});

// $.getJSON('/status', function (res) { })

/*
  $.ajax('/status', {
    contentType: 'application/json',
    dataType: 'json',
    success: function (res ) {...}
  });
*/