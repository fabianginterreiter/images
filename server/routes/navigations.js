"use strict"

const express = require('express');
const router = express.Router();

const bookshelf = require('../model/bookshelf');
const moment = require('moment');
const Tag = require('../model/Tag');

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
          link: '/images/dates/' + year,
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
        service: '/api/images?year=' + year + '&month=' + date.month,
        link: '/images/dates/' + year + '/' + date.month
      })
    });

    years.push({
      key: 'date' + year,
      type: 'action',
      service: '/api/images?year=' + year,
      link: '/images/dates/' + year,
      name: year,
      options: months
    });

    options.push({
      key: 'delete',
      type: 'menu',
      name: 'Dates',
      options: years
    });

    return Tag.query((qb) => {
      qb.orderBy('name','asc');
    }).fetchAll().then((tags) => tags.toJSON());
  }).then((tags) => {
    var result = {
      key: 'tags',
      type: 'menu',
      name: 'Tags',
      options: []
    };

    tags.forEach((tag) => result.options.push({
      key: 'tag_' + tag.id,
      type: 'action',
      name: tag.name,
      link: '/images/tags/' + tag.id,
      service: '/api/images?tag=' + tag.id
    }));

    options.push(result);
  }).then(() => res.send(options)).catch(function(e) {
    console.log(e);
    res.status(404).send('Fehler');
  });
});

module.exports = router;