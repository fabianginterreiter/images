"use strict"

const bookshelf = require('../model/bookshelf');
const moment = require('moment');
const Tag = require('../model/Tag');
const Person = require('../model/Person');
const Album = require('../model/Album');

const BaseController = require('./BaseController');

class NavigationsController extends BaseController {

  index() {
    return this.addAlbums([])
    .then((options) => this.addPersons(options))
    .then((options) => this.addTags(options))
    .then((options) => this.addDates(options));
  }

  addDates(options) {
    return bookshelf.knex('images').distinct('year', 'month').select().orderBy('year', 'desc').orderBy('month', 'desc').then(function(result) {
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
            name: '' + year,
            options: months
          });
          months = [];
          year = date.year;
        }

        months.push({
          key: 'date' + year + date.month,
          type: 'action',
          name: moment().month(date.month - 1).format("MMMM YYYY"),
          service: '/api/images?year=' + year + '&month=' + date.month,
          link: '/images/dates/' + year + '/' + date.month
        })
      });

      years.push({
        key: 'date' + year,
        type: 'action',
        service: '/api/images?year=' + year,
        link: '/images/dates/' + year,
        name: '' + year,
        options: months
      });

      options.push({
        key: 'delete',
        type: 'menu',
        name: 'Dates',
        options: years
      });

      return options;
    });
  }

  addTags(options) {
    return Tag.query((qb) => {
      qb.orderBy('name','asc');
    }).fetchAll().then((tags) => tags.toJSON()).then((tags) => {
      var result = {
        key: 'tags',
        type: 'menu',
        name: 'Tags',
        settings: '/images/tags',
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

      return options;
    });
  }

  addPersons(options) {
    return Person.query((qb) => {
      qb.orderBy('name','asc');
    }).fetchAll().then((persons) => persons.toJSON()).then((persons) => {
      var result = {
        key: 'persons',
        type: 'menu',
        name: 'Persons',
        settings: '/images/persons',
        options: []
      };

      persons.forEach((person) => result.options.push({
        key: 'person_' + person.id,
        type: 'action',
        name: person.name,
        link: '/images/persons/' + person.id,
        service: '/api/images?person=' + person.id
      }));

      options.push(result);

      return options;
    });
  }

  addAlbums(options) {
    return Album.query((qb) => {
      qb.where('user_id', this.session.user).orWhere('public', '>', 0)
      qb.orderBy('name','asc');
    }).fetchAll().then((albums) => albums.toJSON()).then((albums) => {
      var result = {
        key: 'albums',
        type: 'menu',
        name: 'Albums',
        settings: '/images/albums',
        options: []
      };

      albums.forEach((album) => result.options.push({
        key: 'album_' + album.id,
        type: 'action',
        name: album.name,
        link: '/images/albums/' + album.id,
        service: '/api/images?album=' + album.id
      }));

      options.push(result);

      return options;
    });
  }

}

module.exports = NavigationsController;