$(document).ready(function () {

  function showPhotos() {
    $(this).find('span').slideToggle();
  }  
  $('.photos').on('mouseenter', 'li', showPhotos)
              .on('mouseleave', 'li', showPhotos);


  $('#tour').on('click', 'button', function () {
    $.ajax('/photos.html', {
      success: function (response) {
        $('.photos').html(response).fadeIn();
      },
      error: function () {
        $('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
      },
      timeout: 3000,
      beforeSend: function () {
        $('#tour').addClass('loading');
      },
      complete: function () {
        $('#tour').removeClass('loading');
      }
    });
  });

});
