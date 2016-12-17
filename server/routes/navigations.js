const express = require('express');
const router = express.Router();

var bookshelf = require('../model/bookshelf');
var moment = require('moment');

router.get('/', (req, res) => {
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
          type: 'action',
          service: '/api/images?year=' + year,
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
      key: 'date' + year,
      type: 'action',
      service: '/api/images?year=' + year,
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

module.exports = router;