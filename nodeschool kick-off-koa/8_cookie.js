// Use cookie to store user's visit times:
//  * cookie's key = 'view' 
//  * on every request respond with '{time} views'
//  * cookie needs to be 'signed'

// Koa uses https://github.com/expressjs/cookies  

var koa = require('koa');

var app = koa();

// to use signed cookie, we need to set app.keys
app.keys = ['secret', 'keys'];

app.use(function* () {
  // first time, it's undefined, so ~~ converts it to zero
  var n = ~~this.cookies.get('view', { signed: true }) + 1;
  this.cookies.set('view', n, { signed: true });
  this.body = n + ' views';
});

app.listen(process.argv[2]);


// ctx.cookies.get(name, [options])
//  * 'signed':   the cookie requested should be signed

// ctx.cookies.set(name, value, [options])
//  * 'signed':   sign the cookie value
//  * 'expires':  a Date for cookie expiration
//  * 'path':     cookie path, '/' by default
//  * 'domain':   cookie domain
//  * 'secure':   secure cookie
//  * 'httpOnly': server-accessible cookie, true by default


//  ~~ is a double NOT bitwise operator; 
//  Used as Math.floor() for positive and Math.ceil() for negative numbers.
//  If not a number, converted to zero.
//
//  ~(5.5)    => -6
//  ~(-6)     => 5
//  ~~5.5     => 5  (same as Math.floor(5.5))
//  ~~(-5.5)  => -5 (NOT the same as Math.floor(-5.5), which would give -6)
//
//  ~~null       =>  0
//  ~~undefined  =>  0
//  ~~{}         =>  0
//  ~~[]         =>  0
//
//  false  =>  true
//  true   =>  false