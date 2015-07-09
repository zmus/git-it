/*------------------------------------------------------------------------------
                            JavaScript Objects

- organiziramo kod iz prve lekcije spremanjem u objekt
- DOM objects are mostly HARDCODED
- limited to 1 confirmation on the page
-------------------------------------------------------------------------------*/

var confirmation = {
  // init method creates event handlers
  init: function () {
    $('.confirmation').on('click', 'button', this.loadConfirmation);
    $('.confirmation').on('click', '.view-boarding-pass', this.showBoardingPass);
  },
  loadConfirmation: function () {
    $.ajax('confirmation.html', {
      timeout: 3000,
      success: function (response) {
        $('.ticket').html(response).slideDown();
      },
      error: function (request, errorType, errorMessage) {
        alert('Error: ' + errorType + ' with message: ' + errorMessage);
      },
      beforeSend: function () { 
        $('.confirmation').addClass('is-loading');  
      },
      complete: function () {
        $('.confirmation').removeClass('is-loading');
      }
    });
  },
  showBoardingPass: function (event) {
    event.preventDefault();
    $('.view-boarding-pass').hide();
    $('.boarding-pass').show();
  }
};

$(document).ready(function () {
  confirmation.init();
});
