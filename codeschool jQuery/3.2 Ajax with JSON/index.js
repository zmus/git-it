/* -----------------------------------------------------------------------------
                             Ajax With JSON
----------------------------------------------------------------------------- */
$(function () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    var form = $(this);

    // URL is now softcoded, chosen in <form action=''>
    $.ajax(form.attr('action'), {
       type: form.attr('method'), 
       data: form.serialize(),
       //dataType: 'json',
       success: function (res) {
         form.remove();
         $('#tour').html('<p></p>')
                   .find('p')
                   .append('Destination: ' + res.location)
                   .append('<br>Nights: ' + res.nights)                       
                   .append('<br>Price: ' + res.price);
       }
    });
  });
});


/*

Gore imamo 'circular reference error'. Inače bi se moglo i ovak.

$.ajax('url', {
    'data': JSON.stringify(yourJSONObject), //{action:'x',params:['a','b','c']}
    'type': 'POST',
    'processData': false,
    // Typically 'application/x-www-form-urlencoded', 
    // but the service you are calling may expect 'text/json'... 
    // Check with the service to see what they expect as content-type in the HTTP header.
    'contentType': 'application/json' 
});

*/