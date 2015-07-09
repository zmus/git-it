/* -----------------------------------------------------------------------------
                              Custom Events
----------------------------------------------------------------------------- */
$(document).ready(function () {
 
var showPrice = function () {
  var vacation = $(this).closest('.vacation');
  var price = vacation.data('price');
  var details = $('<p>Book 3 days for $' + 3 * price + '</p>');
  vacation.append(details);
}

// event handler syntax:
// $(<dom element>).on('<event>.<namespace>', <method>)  =>  click.price: method

$('.vacation').on('click.price', '.button', showPrice)
 
               // <event> can also be custom
              .on('show.price', showPrice);

$('.show-prices').on('click', function (event) {
  
  // prevent link from being followed
  event.preventDefault();

  // .trigger('<event>.<namespace>') => trigger event on the targets 
  $('.vacation').trigger('show.price')

                // .off('<event>.<namespace>') => stop watching for the given events
                .off('.price');
});

});


