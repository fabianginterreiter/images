"use strict"

var Person = require('../model/Person');

var BaseController = require('./BaseController');

class PersonsController extends BaseController {
  index() {
    return Person.query((qb) => {
      if (this.query.q) {
        qb.where('name', 'LIKE', this.query.q);
      }

      qb.orderBy('name','asc');
    }).fetchAll().then((result) => (result.toJSON()));
  }
}

module.exports = PersonsController;