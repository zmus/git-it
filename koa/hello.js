var koa = require('koa');

var app = koa();

app.use(function* (next) {
  if (this.path !== '/') return yield next;
  this.body = 'hello';
});

app.use(function* (next) {
  if (this.path !== '/400' && this.method !== 'post') return yield next;
  this.body = '400';
});

app.use(function* () {
  this.body = 'trolololo';
});

app.listen(3000);

