// responseTime: 
//               - record each request's response time(ms)
//               - set response header 'X-Response-Time' 
// upperCase: 
//               - convert response body to upper case

var koa = require('koa');

var app = koa();


app.use(responseTime());

app.use(upperCase());

app.use(function* () {
  // step 3: respond
  this.body = 'hello koa';
});


function responseTime() {
  return function* (next) {
    // step 1: record start time  
    var start = new Date;
    yield next;
    // step 5: set X-Response-Time header  
    this.set('X-Response-Time', new Date - start);
  };
}

function upperCase() {
  return function* (next) {
    // step 2: do nothing  
    yield next;
    // step 4: convert this.body to upper case  
    this.body = this.body.toUpperCase();
  };
}


app.listen(process.argv[2]);


// 'X' prefix is convention for custom, user defined headers

// When a middleware invokes 'yield next' the function suspends and 
// passes control to the next middleware defined. 
//
// After there are no more middleware to execute downstream, the stack will 
// unwind and each middleware is resumed to perform its upstream behaviour.