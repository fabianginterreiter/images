var express = require('express');
var fs = require('fs');
var app = express();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var uploads = require('./lib/Upload');

var GetImages = require('./lib/GetImages');
var DeleteImage = require('./lib/DeleteImage');
var moment = require('moment');

var bookshelf = require('./model/bookshelf');

app.post('/api/upload', upload.single('image'), function(req, res) {
  uploads(req.file, 'data').then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.send(err);
  })
});

app.get('/api/images', function(req, res) {
  GetImages(req.query).then(function(images) {
    res.send(images);
  }).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

app.delete('/api/images/:id', function(req, res) {
  DeleteImage(req.params.id, 'data').then((result) => (res.send(result))).catch((e) => (res.status(404).send('Fehler')));
});

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

app.use('/thumbs', express.static('data/thumbs'));
app.use('/images', express.static('data/cache'));




require('./model/bookshelf').knex.migrate.latest().then(function(err) {
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
