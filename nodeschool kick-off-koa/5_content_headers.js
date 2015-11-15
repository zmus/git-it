// Check the Content-Type of the request.
//  application/json: 
//    return { message: "hi!" } with appropriate content headers
//  otherwise: 
//    return "ok" as a string

var koa = require('koa');

var app = koa();

app.use(function* () {
  this.body = this.request.is('json')
    ? { message: 'hi!' }
    : 'ok';
});

app.listen(process.argv[2]);


// Koa has getters/setters for type and length:
//
//  * this.request.type
//  * this.request.length
//  * this.response.type
//  * this.response.length

// We don't want to use RegEx to try all the possible mime types of 
// this.request.type. Koa has:
//
//  * this.request.is() 
//  * this.response.is().
//
//   this.request.is('image/*')  =>  image/png
//   this.request.is('text')  =>  text or false
