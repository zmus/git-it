/* in this module we set one object (hello) as public method */

var hello = function() {
  console.log("hello!");
}

// expose method (make it public)
module.exports = hello;
// 'exports' defines what 'require' returns   