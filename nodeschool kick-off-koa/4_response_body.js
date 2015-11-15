//  /stream - respond with the content in file process.argv[3]
//  /json   - returns a JSON body

var koa = require('koa');
var fs  = require('fs');

var app = koa();

var msg = fs.createReadStream(process.argv[3]);

app.use(function* (next) {
  if (this.path !== '/stream') return yield next;
  // Koa will automatically handle errors and leaks.
  this.body = msg;
});

app.use(function* (next) {
  if (this.path !=='/json') return yield next;
  this.body = { "foo": "bar" }
});

app.listen(process.argv[2]);


// Koa supports following types of bodies:
//  * Strings
//  * Buffers
//  * Streams (node)
//  * JSON Objects