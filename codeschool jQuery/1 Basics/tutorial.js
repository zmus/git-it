/*------------------------------------------------------------------------------
                            jQuery Ajax Method
-------------------------------------------------------------------------------*/

// $.ajax(url[, settings])

// URL can be relative 

$(document).ready(function () {

/*  Event Delegation:
      - listen for events inside .confirmation
      - when they happen, check if the target was .view-boarding-pass
    Because elements loaded with AJAX don't exist at the beginning.
*/  
$('.confirmation').on('click', '.view-boarding-pass', function () {
  
  $.ajax('/confirmation.html', {

    // Runs this callback when server returns successful response
    success: function (response) {
      $('.ticket').html(response).slideDown();
    },

    // Runs this callback if there is a timeout, abort or server error
    error: function (request, errorType, errorMessage) {
      alert('Error: ' + errorType + ' with message: ' + errorMessage);
    },

    // After 3s call 'timeout error' callback
    timeout: 3000,

    // Runs before the Ajax request
    beforeSend: function() { 
      $('.confirmation').addClass('is-loading');  // e.g. CSS animation
    },

    // Runs after success or error (last thing that loads)
    complete: function () {
      $('.confirmation').removeClass('is-loading');
    },

    // Sending parameters with requests 
    data: { "confNum": 1234 },  // confirmation.html?confNum=1234

    // Data can be dynamic... The flight number could be pulled from HTML:
    // <div class="ticket" data-confNum="1234">
    data: { "confNum": $('.ticket').data('confNum') }

  });

});
});


// Shorthand Method: $.get(url, success)

$.get('confirmation.html', function (response) {
  $('.ticket').html(response).slideDown();
});





