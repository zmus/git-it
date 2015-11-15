// Create a koa server that returns the following responses from the 
// following routes:
//   /    - hello koa
//   /404 - page not found
//   /500 - internal server error


// Unlike Express, Koa does not include a router.
// Without router, routing can be done using this.path and yield next.

var koa = require('koa');
var app = koa();

app.use(function* (next) {
  // skip the rest of the code if the route does not match
  if (this.path !== '/') return yield next;
  this.body = 'hello koa'; 
});

app.use(function* (next) {
  if (this.path !== '/404') return yield next;
  this.body = 'page not found';
});

app.use(function* (next) {
  if (this.path !== '/500') return yield next;
  this.body = 'internal server error';
});

app.listen(3000);


// More properties when routing:
//  * this.method
//  * this.query
//  * this.host

// Some router middlewares for koa (in npm):
//  * koa-route
//  * koa-router
//  * koa-resource-router