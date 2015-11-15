// A function 'feedCat()' takes food as a String argument and returns 'yum'.
// If you try to feed the cat 'chocolate', will throw an error.
// 

var test = require('tape');

var feedCat = require(process.argv[2]);

test(function (t) {
  t.plan(2);
  t.equal(feedCat('food'), 'yum');
  t.throws(feedCat.bind(null, 'chocolate'));
  /*
      t.throws(function () {
        feedCat('chocolate');
      });   
  */
});  


// t.throws(fn, expected, msg)
// Assert that the function call fn() throws an exception. 
// 'expected', if present, must be a RegExp or Function.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                