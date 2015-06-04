// Write a passing assertion for the function 'isCoolNumber', that will assure
// it returns 'true' when passing '42' in it.
// path of module = process.argv[2]


// built-in node module
// http://nodejs.org/api/assert.html
var assert = require('assert');  


var isCoolNumber = require(process.argv[2]);

assert(isCoolNumber(42)); 



// assert.ok(value, message)  =>  tests if value is truthy

// assert.equal(actual, expected, message)     =>  ==
// assert.notEqual(actual, expected, message)  =>  !=

// assert.deepEqual(actual, expected, message)  =>  for comparing objects
// assert.notDeepEqual(actual, expected, message)  

// assert.strictEqual(actual, expected, message)     =>  ===
// assert.notStrictEqual(actual, expected, message)  =>  !==