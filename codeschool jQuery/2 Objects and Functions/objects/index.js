$(document).ready(function () {
  tour.init();
  tour.description();
});

var tour = {
  init: function () {
    $('#tour').on('click', 'button', this.fetchPhotos);
  },

  fetchPhotos: function () {
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
  },  

  description: function () {
    $('.photos').on('mouseenter', 'li', this.toggleDescription)
                .on('mouseleave', 'li', this.toggleDescription);
  },

  toggleDescription: function () {
    $(this).find('span').slideToggle();
  }
};

