// Write a test for a function 'repeatCallback(n, cb)', that calls
// the callback 'cb' exactly 'n' times.


// If we are not simply checking return values of functions, but if callback
// was called or not.

var test = require('tape');

var repeatCallback = require(process.argv[2]);

test('repeatCallback', function (t) {

  // 't.end()' is called after the 'n'-th assertion.
  // If there are > n assertions, they will generate errors.
  t.plan(4);

  repeatCallback(4, function () {

    // Generate a passing assertion with msg.
    t.pass('callback called');
  });
});