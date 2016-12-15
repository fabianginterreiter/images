var fs = require('fs-extra');
var bodyParser = require('body-parser');
var bookshelf = require('./model/bookshelf');
var config = require('./config');

var express = require('express');
var cookieSession = require('cookie-session')

var app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(bodyParser.json());

app.use('/api/session', require('./routes/session'));
app.use('/api/images', require('./routes/images'));
app.use('/api/users', require('./routes/users'));
app.use('/api/options', require('./routes/options'));
app.use('/api/navigations', require('./routes/navigations'));

app.use(express.static('public'));

app.use('/thumbs', express.static(config.getThumbnailPath()));
app.use('/images', express.static(config.getPreviewPath()));

fs.ensureDir(config.getPath(), function(err) {
  if (err) {
    return 'ERROR';
  }
  require('./model/bookshelf').knex.migrate.latest().then(function(err) {
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
  });
});