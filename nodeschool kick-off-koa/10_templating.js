// When GET '/', reply with HTML which is processed 'ejs' template file.

var koa = require('koa');
var app = koa();

// npm install co-views ejs  ('co-views' and 'ejs')

var views = require('co-views');

// setup views, appending *.ejs when no extname is given to render()

var render = views(__dirname + '/views', {
  ext: 'ejs'
});

// dummy data

var user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
}

// render

app.use(function *() {
  this.body = yield render('user', { 
    user: user 
  });
});

app.listen(process.argv[2]);