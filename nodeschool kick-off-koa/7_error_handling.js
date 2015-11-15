// Add an error handler middleware.
// 'errorHandler' should catch all the downstream errors, 
// then responds to the client with 'internal server error' and status '500'.

var koa = require('koa');

var app = koa();

app.use(errorHandler());

app.use(function* () {
  if (this.path === '/error') throw new Error('ooops');
  this.body = 'OK';
});

function errorHandler() {
  return function* (next) {
    // try catch all downstream errors here
    try {
      yield next;
    } catch(err) {
      this.status = 500;
      this.body = 'internal server error';
      // Can emit on app for log:
      // this.app.emit('error', err, this);
    }
  };
}

app.listen(process.argv[2]);