// Request:  POST / with { name: 'koa' }
// Response: KOA

var koa = require('koa');
// npm install co-body
var parse = require('co-body');

var app = koa();

app.use(function* (next) {
  // Only accept POST requests.
  if (this.method !== 'POST') return yield next;

  // co-body is a yieldable and accepts a Koa Context as its first argument.
  // max body size limit to '1kb':
  var body = yield parse(this, { limit: '1kb' });

  // If body.name not exist, respond '400':
  if (!body.name) this.throw(400, '.name required');

  this.body = body.name.toUpperCase();
});

app.listen(3000);


// Other body parsers:
//  * https://github.com/koajs/body-parser
//  * https://github.com/koajs/body-parsers