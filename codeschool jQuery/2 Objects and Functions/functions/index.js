$(document).ready(function () {
  var london = new Tour($('#london'));
  var paris = new Tour($('#paris'));
});

function Tour(el) {
  this.el = el;
  var tour = this;

  this.fetchPhotos = function () {
    $.ajax('/photos', {
      context: tour,
      success: function (response) {
        this.el.find('.photos').html(response).fadeIn();
      },
      error: function () {
        this.el.find('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
      },
      timeout: 3000,
      beforeSend: function () {
        this.el.addClass('loading');
      },
      complete: function () {
        this.el.removeClass('loading');
      },
      // dodajemo query ('tour' umjesto 'this' jer je unutar objekta)
      data: { "location": tour.el.data('location') }
    });
  }; 

  this.toggleDescription = function () {
    $(this).find('span').slideToggle();  // this === <li></li>
  }

  this.el.on('mouseenter', 'li', this.toggleDescription)
         .on('mouseleave', 'li', this.toggleDescription);

  this.el.on('click', 'button', this.fetchPhotos);

}

