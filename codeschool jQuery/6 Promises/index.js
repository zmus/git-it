/* -----------------------------------------------------------------------------
                                Promises
                                
$.Deferred().resolve(res) .reject(err)      
            .done(res)    .fail(err) 
$.when() 
$.then()            
----------------------------------------------------------------------------- */

// Encapsulate promise to use on multiple pages on the website

// $.ajax() returns a promise object
var Weather = { 
  today: function (location) {
    // Create a new promise object. ( deferred = odgođen )
    var promise = $.Deferred();
    $.ajax('/weather', {
      data: {q: location},
      success: function (res) {
        // Trigger our .done method with argument
        promise.resolve(res);
      }, 
      error: function () {
        var error = 'invalid location';
        promise.reject(error);
      }
    });
    return promise;
  }
};

var City = {
  find: function (location) {
    var promise = $.Deferred();
    $.ajax('/city', {
      data: {q: location},
      success: function (res) {
        promise.resolve(res);
      }
    });
    return promise;
  }
};

$('button').on('click', function () {
  var location = $('.loc').text();
  var results = $(this).parent().find('.results').empty(); 
  
  $.when(
    Weather.today(location),
    City.find(location)
    ).then(function (weatherRes, cityRes) {
      results.append(weatherRes)
             .append('<img src="' + cityRes +'">');                
    });
  
    Weather.today(location).fail(function (error) {
      console.log(error);
    });

});

// jQuery method for creating a promise object
// var promise = $.Deferred();

// resolve() calls the done() callback
// promise.resolve(value); => promise.done(function (value) {});

// reject() calls the fail() callback
// promise.reject(value);  => promise.fail(function (value) {});


// Ajax requests never load at the same time. 
// To preserve order of elements we have to render data not until all promises are returned:

// $.when(<promise1>, <promise2>...).then(function (p1Data, p2Data) {});

// Callback data in the same order as promises...
