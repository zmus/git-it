/* -----------------------------------------------------------------------------
                              jQuery Plugins
----------------------------------------------------------------------------- */

// $.fn. => Make the priceify method available to all jQuery objects
$.fn.priceify = function (options) {

  // this = jQuery object the plugin vas called on
  this.each(function () {   
    var settings = $.extend({ 
      days: 3, 
      vacation: $(this),
      price: $(this).data('price')
    }, options);
    
    var show = function () {
      var details = '<p>Book ' + settings.days + ' days for $' + 
                    (settings.days * settings.price) + '</p>';
      settings.vacation
              .append($(details));
    };

    var remove = function () {
      settings.vacation
              .hide()
              .off('.priceify');
    };
    
    settings.vacation
            .on('click.priceify', '.show-price', show)
            .on('show.priceify', show)
            .on('click.priceify', '.remove-vacation', remove);
  });
};

$(document).ready(function () {
  $('.vacation').priceify();
  $('.show-prices').on('click', function (e) {
    e.preventDefault();
    $('.vacation').trigger('show.priceify');
  })
});

// $.extend => combine objects
// How to set a default value?
//   $.extend({ days: 3 }, { days: 5 }); => { days: 5 }


