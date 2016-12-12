var express = require('express');
var fs = require('fs-extra');
var app = express();


var moment = require('moment');

var bookshelf = require('./model/bookshelf');

var config = require('./config');

app.use('/api/images', require('./routes/images'));

app.get('/api/options', function(req, res) {
  res.send([{
    key: 'test',
    type: 'action',
    name: 'Blub'
  }, {
    key: 'mm',
    type: 'menu',
    name: 'Albums',
    open: true,
    options: [ {
      key: 'test2',
      type: 'action',
      name: 'Blub'
    }]
  }]);
});

app.get('/api/navigations', function(req, res) {
  var options = [];

  bookshelf.knex('images').distinct('year', 'month').select().orderBy('year', 'desc').orderBy('month', 'desc').then(function(result) {
    var year = null;
    var years = [];
    var months = [];
    result.forEach(function(date) {
      if (!year) {
        year = date.year;
      }

      if (year !== date.year) {
        years.push({
          key: 'date' + year,
          type: 'menu',
          name: year,
          options: months
        });
        months = [];
        year = date.year;
      }

      months.push({
        key: 'date' + year + date.month,
        type: 'action',
        name: moment().month(date.month - 1).format("MMMM"),
        service: '/api/images?year=' + year + '&month=' + date.month
      })
    });

    years.push({
      key: 'send',
      type: 'menu',
      name: year,
      options: months
    });

    res.send([{
      key: 'delete',
      type: 'menu',
      name: 'Dates',
      options: years
    }]);
  }).catch(function(e) {
    console.log(e);
    res.status(404).send('Fehler');
  });

  
});

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