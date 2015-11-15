
function math(element) {

  function findOffset(column) {

    //if (!column.childNodes) return 0;

    var rows = column.children;
    var middleRow; 
    var offset;

    if (rows.length) {

      if (rows.length === 1) {

        offset = rows[0].batman;

      } else {

        if (rows.length % 2 === 0) {
          middleRow = rows[rows.length / 2 - 1];
          offset = middleRow.offsetTop + middleRow.offsetHeight;
        } else { 
          middleRow = rows[(rows.length - 1) / 2];
          offset = middleRow.offsetTop + middleRow.offsetHeight / 2;
        }

      }

    // If column has no rows...
    } else offset = column.offsetTop + column.offsetHeight / 2;

    return offset;
  }

  function align(columns) {

    var max = 0;  // largest distance of a middle row from the top
    var c = columns;

    for (var i = 0; i < c.length; i++) {

      // Reset
      c[i].removeAttribute('style', 'margin-top');

      c[i].offset = findOffset(c[i]);
      if (c[i].offset > max) max = c[i].offset;
    }

    // Apply normalized offset to each column.
    for (var i = 0; i < c.length; i++) {

      // Ensures empty <li> are full height
      if (c[i].childNodes.length) {
        if (max  > c[i].offset)
          c[i].setAttribute('style', 'margin-top: ' + (max - c[i].offset) + 'px');
      }
    }

    c[0].parentNode.batman = max;
  }

  function traverse(row) {

    // no columns
    if (! row.children.length) return;

    var columns = row.children;

    for (var i = 0; i < columns.length; i++) {

      // has rows
      if (columns[i].children.length) {

        for (var j = 0; j < columns[i].children.length; j++) 
          traverse(columns[i].children[j]);
      }
    }

    return align(columns);

  }

  traverse(element);
}

document.addEventListener('DOMContentLoaded', function () {
  
  var m = document.querySelectorAll('.math');
  for (var i = 0; i < m.length; i++) math(m[i]);

  sqrt();

  document.addEventListener('DOMNodeInserted', function () {

    var m = document.querySelectorAll('.math');
    for (var i = 0; i < m.length; i++) math(m[i]);
  
  });

});

/* 
 * Checking if element has children elements (without text an space):
 *    element.firstElementChild !== NULL
 *    element.children.length !== NULL
 */ 

/*
1) row
2) columns = row.children
3) for each column
  3.1) var middleRow = (column.children.length - 1) / 2
  3.2) column.offset = middleRow.(offsetTop + offsetHeight / 2)
4) var max = find biggest offset 
5) for each column
  5.1) first-child.setAttribute('style', 'margin-top: ' + (max - offset))
*/


/*
var target = document.querySelector('math');
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    console.log(mutation.type);
    console.log(mutation.target);
    console.log(mutation.addedNodes[0]);
    var a = mutation.addedNodes[0];
    a.style.backgroundColor = 'green';
  });
});
var config = { subtree: true, attributes: true, childList: true, characterData: true };

observer.observe(target, config);
*/

function sqrt() {
  var elements = document.querySelectorAll('.msqrt');
  function sqrtSvg(width, data) {
    return '<li> <ul><li>' + data + '</li></ul> <ul></ul> <ul><li style="outline: 3px solid green">' +

        '<svg viewBox="0 0 50 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">' +
          '<polyline points="0,3 3,0" style="stroke: black; stroke-width: 3px;"/>' +
          '<polyline points="3,0 50,100" style="stroke: black; stroke-width: 5px;"/>' +

        '</li></ul>' + '<li><ul><li>' +      

        '<svg width="' + width + '" class="msqrt-svg-right" "viewBox="0 0 50 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">' +
          '<polyline points="0,100 49.2,0" style="stroke: black; stroke-width: 4px;"/>' +
        '</svg>' + '</li></ul></li>';
  
}
  for (var i = 0; i < elements.length; i++) {
   //if (sqrtElements[i].previousSibling.tagName !== 'mtext') {
    var width = elements[i].children[0].offsetHeight * 0.25 + 'px';
    var data = elements[i].getAttribute('data');
//console.log(elements[i]);
    elements[i].children[0].insertAdjacentHTML('afterbegin', sqrtSvg(width, data));
   //}
  }
}

