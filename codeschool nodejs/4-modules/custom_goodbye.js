/* this way we can set multiple methods as public */

exports.goodbye = function() {
	console.log("bye!");
}

// private function (available from within the module)...
var foo = function() {} 

// becomes public method (accessible from outside the module)
exports.foo = foo; 
