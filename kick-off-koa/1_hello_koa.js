// Create a koa server that listens on a port passed from the command listens
// and replies with "hello koa" when HTTP GET request is sent to /.

var koa = require('koa');

var app = koa();

app.use(function* () {
  this.body = 'hello koa';
});

// listen on a port passed from the command line
app.listen(process.argv[2]);

