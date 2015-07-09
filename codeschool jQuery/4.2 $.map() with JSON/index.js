/* -----------------------------------------------------------------------------
                                 $.map()

$.map(collection, function(<item>, <index>){});

Map returns an array modified by what is returned in the function passed as an 
argument.    

$.each() vs $.map():
  - index and item are switched
  - $.map()  returns changed array
  - $.each() returns original array                              
----------------------------------------------------------------------------- */

$(function () {

  // .one => executed at most once per element !!!
  $('button').one('click', function () {
    $.getJSON('/cities/favorite', function (res) {
        var photos = $.map(res, function (city, index) {
          var item = $('<div/>').addClass('.favorite-' + index)
                                .append($('<p/>', { html: city.name}))
                                .append($('<img>', { src: city.image })); 
          return item;      
        });
        console.log(res);
        
        // ovo bi kao trebalo bit brže od samo .html(), jer izvadi element iz DOM-a 
        console.time('bok');
        $('.favorite').detach()
                      .html(photos)
                      .appendTo('body');
        console.timeEnd('bok');

        $('.favorite img').width('50%');
    });
  });

  $('button').on('click', function () {
    $('.favorite>div').toggle();
  });
});


/*
  $.getJSON() ===

  $.ajax('/status', {
    contentType: 'application/json',
    dataType: 'json',
    success: function (res ) {...}
  });
*/