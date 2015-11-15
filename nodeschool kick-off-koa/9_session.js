// Store user's view times using session.

// 'koa-session' => cookie-based sessions
// 'koa-generic-session' =>  more generic implementation, as in Express 


var koa = require('koa');
var session = require('koa-session');

var app = koa();

// koa-session is based on signed cookies, so we must set app.keys
app.keys = ['secret', 'keys'];

app.use(session(app));  // now we can use 'this.session' in koa handlers

app.use(function *() {
  var n = this.session.views || 0;
  this.session.views = ++n;
  this.body = n + ' views';
});

app.listen(process.argv[2]);


