"use strict"

const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const bookshelf = require('./model/bookshelf');
const config = require('./config');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(session(config.getSessionConfig(session)));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api/albums', require('./routes/albums'));
app.use('/api/session', require('./routes/session'));
app.use('/api/images', require('./routes/images'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tags', require('./routes/tags'));
app.use('/api/persons', require('./routes/persons'));
app.use('/api/options', require('./routes/options'));
app.use('/api/navigations', require('./routes/navigations'));
app.use('/api/trash', require('./routes/trash'));
app.use('/api/search', require('./routes/search'));

app.use(express.static('public'));

app.use('/thumbs', express.static(config.getThumbnailPath()));
app.use('/images', express.static(config.getPreviewPath()));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

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
