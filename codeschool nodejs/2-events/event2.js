/* custom event emitter constructor */
var EventEmitter = require('events').EventEmitter; // require 'events' class

/* logger event emitter */
var logger = new EventEmitter(); // emits ERROR, WARN & INFO events

/* on 'error' event run this callback */
logger.on('error', function(message) {
	console.log('ERR: ' + message);
});

/* triggers/emits event */
logger.emit('error', 'Nije dobro');    // --> ERR: Nije dobro
logger.emit('error', 'Eggs Cracked');  // --> ERR: Eggs Cracked

