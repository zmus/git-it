/* -----------------------------------------------------------------------------
                             Ajax With Forms
----------------------------------------------------------------------------- */
$(function () {
    $('form').on('submit', function (event) {
        // prevent default behaviour of form: submit and refresh page
        event.preventDefault();
        var form = $(this);
        $.ajax('/book', {
           // used for forms
           type: 'POST', 
           // merges all form fields for submission
           data: form.serialize(),
           success: function (response) {
               form.remove();
               $('#vacation').hide().html(response).fadeIn();
           }

        });
    });
});

// Ovo dobijemo sam serialize():
//
//  data: { "destination": $('destination').val(),
//         "quantity": $('quantity').val() }