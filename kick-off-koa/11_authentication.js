// Create simple app with login and logout features.

//  * '/' - if user is logged in => 'hello world'
//        - otherwise => '401' error
//  * '/login' - GET => return a form
//             - POST => validate the request
//                    => if login successful, redirect to '/'
//  * '/logout' - logout the user 
//              - redirect to '/login'
//
// We're not actually going to create users in this example.
// Authenication is  'username = username  password = password'.
// All other authenication should get '400' error.

var koa = require('koa');
var parse = require('co-body');
var session = require('koa-session');

var form = 
'<form action="/login" method="POST">\
    <input name="username" type="text" value="username">\
    <input name="password" type="password" value="password">\
    <button type="submit">Submit</button>\
</form>';

var app = koa();

// Use 'koa-session' somewhere at the top of the app.
// We need to set the ' keys' for signed cookies and the 'cookie-session' module.

app.keys = ['secret1', 'secret2', 'secret3'];
app.use(session(app));

// If 'this.session.authenticated' exists => 'hello world'.
// Otherwise '401' because user is not logged in.

app.use(function* home(next) {
  if (this.request.path !== '/') return yield next;
  if (this.session.authenticated) return this.body = 'hello world';
  this.status = 401;
});

// If successful, the logged in user should be redirected to '/'.

app.use(function* login(next) {
  if (this.request.path !== '/login') return yield next;
  if (this.request.method === 'GET') return this.body = form;
  if (this.request.method !== 'POST') return;
  
  var body = yield parse(this);
  if (body.username !== 'username' || body.password !== 'password')
    return this.status = 400;

  this.session.authenticated = true;
  this.redirect('/');
  
  // In real you would want to set 'this.session.userid=' to specify the user.
});

// Redirect to '/login' after every response.
// If user hits '/logout' when already logged out, consider that 
// 'success' (not error).

app.use(function* logout(next) {
  if (this.request.path !== '/logout') return yield next;
  this.session.authenticated = false;
  this.redirect('/login');
});

app.listen(process.argv[2]);