/*------------------------------------------------------------------------------
                      JavaScript Functions ( use of "this" )

- organiziramo kod iz prve lekcije korištenjem funkcije
- prednost pred objektom je što je možemo koristiti za više konfirmacija (buttona)
- DOM objects can be SOFTCODED
-------------------------------------------------------------------------------*/


/* constructor */ 

function Confirmation(el) {  // el = jQuery element
  this.el = el;
  this.ticket = this.el.find('.ticket');
  var confirmation = this;

  /* helper methods */

  this.loadConfirmation = function () {
    $.ajax('/confirmation.html', {
      timeout: 3000,
      
      // "this" === ajax settings object
      
      // set the value of "this" in callbacks 
      context: confirmation,
      
      success: function (response) {
        // this === confirmation
        this.ticket.html(response).slideDown();
      }
    });
  }

  this.showBoardingPass = function () {
    event.preventDefault();
    
    $(this).hide();  

    confirmation.el.find('.boarding-pass').show();

    // provjera:
    console.log(this);  //  this === .view-boarding-pass  (link from event handler)
    console.log(confirmation);
  }

  /* event handlers */

  // moraju doći NAKON 'function expressions' koje pozivaju
  this.el.on('click', 'button', this.loadConfirmation);
  this.el.on('click', '.view-boarding-pass', this.showBoardingPass);

}

$(document).ready(function () {
  var paris = new Confirmation($('#hawaii'));
  var london = new Confirmation($('#paris'));
});


/*
In vanilla JS you can call a method with a specified context using 
method.apply() / method.call() but you cannot re-assign "this".
*/