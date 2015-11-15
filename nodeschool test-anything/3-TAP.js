// Write tests that output 'TAP', that tests the following properties of a 
// function 'fancify' ( process.argv[2] ).
//
//  * 'fancify(str)' return the 'str' wrapped in '~*~'
//  * optional 2nd argument that converts the string into ALLCAPS
//  * optional 3rd argument that determines the character in the middle


// TAP = Test Anything Protocol  =>  standard for outputting data from tests 
//                               =>  readable for humans and machines

// modules => tape, tap

var test = require('tape');

var fancify = require(process.argv[2]); 

test('fancify test', function (t) {
  // assertions
  t.equal(fancify('Hello'), '~*~Hello~*~', 'Wraps a string in ~*~');
  t.equal(fancify('Hello', true), '~*~HELLO~*~', 'Optionally makes it allcaps');
  t.equal(fancify('Hello', false, '!'), '~!~Hello~!~', 'Optionally allows to set the character');

  // done
  t.end();
});

