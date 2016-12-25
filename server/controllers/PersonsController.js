"use strict"

var Person = require('../model/Person');

var BaseController = require('./BaseController');

class PersonsController extends BaseController {
  index() {
    return Person.query((qb) => {
      qb.select('persons.*');

      if (this.query.q) {
        qb.where('name', 'LIKE', this.query.q);
      }

      qb.count('images_persons.person_id AS count')
      qb.join('images_persons', function() {
        this.on('persons.id', 'images_persons.person_id');
      });
      qb.groupBy('persons.id');

      qb.orderBy('name','asc');
    }).fetchAll().then((result) => (result.toJSON()));
  }

  get() {
    return new Person({id:this.params.id}).fetch().then((result) => (result.toJSON()));
  }

  update() {
    return new Person({id:this.params.id}).save({name:this.body.name}, {patch: true}).then((result) => (result.toJSON()));
  }

  destroy() {
    return new Person({id:this.params.id}).fetch().then(function(result) {
      return new Person({id:this.params.id}).destroy().then(function() {
        return result.toJSON();
      });
    }.bind(this));
  }
}

module.exports = PersonsController;