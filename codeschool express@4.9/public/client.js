// Parsing form data depends on middleware NOT shipeed with Express
// => $ npm install body-parser


$(function () {  // shorter method for $(document).ready(function () {

  // calls '/people' URL path and then runs appendToList()
  $.get('/people', appendToList);  


  function appendToList(people) { 

    var list = [];
    var content, person;

    for (var i in people) {
      person = people[i];

      // link to each person's description
      content = '<a href="#" data-person="' + person + '"><img src="del.png"></a>'
              + '<a href="/people/' + person + '">' + person + '</a> ';
      list.push($('<li>', { html: content }));
    }
    $('.people-list').append(list);  // works with arrays
  }

  
  $('form').on('submit', function (event) {

    // prevent form from being immediately submitted
    event.preventDefault();

    var form = $(this);

    // transforms form data to URL-encoded notation
    var personData = form.serialize();

    $.ajax({
      type: 'POST', url: '/people', data: personData

    // in response, we get personName = recently created person
    }).done(function (personName) {  

      // appendToList() expects an array
      appendToList([personName]);

      // clear input text fields 
      form.trigger('reset');
    });
  });


  // a[] => links with a 'data-person' attribute
  $('.people-list').on('click', 'a[data-person]', function (event) {

    if (!confirm('Are you sure?')) {
      return false;
    }
    // the link element that was clicked
    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE', url: '/people/' + target.data('person')
    }).done(function () {

      // removes <li> containing the link
      target.parents('li').remove();
    });
  });

});