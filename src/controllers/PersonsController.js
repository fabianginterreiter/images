"use strict"

const BaseController = require('./BaseController');

const Person = require('../model/Person');
const ImagePerson = require('../model/ImagePerson');

class PersonsController extends BaseController {
  index() {
    return Person.query((qb) => {
      qb.select('persons.*');

      if (this.query.q) {
        qb.where('name', 'LIKE', this.query.q.replace(/%20/g, " "));
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
    return new Person({
      id:this.params.id
    }).fetch().then((result) => (result.toJSON()));
  }

  update() {
    return new Person({
      id:this.params.id
    }).save({
      name:this.body.name
    }, {
      patch: true
    }).then((result) => (result.toJSON()));
  }

  destroy() {
    return new Person({
      id:this.params.id
    }).fetch().then(function(result) {
      return new Person({
        id:this.params.id
      }).destroy().then(function() {
        return result.toJSON();
      });
    }.bind(this));
  }

  addPerson() {
    var person = this.body;

    if (person.id) {
      return new ImagePerson({
        image_id: this.params.id,
        person_id: person.id,
        top: person.top,
        left: person.left,
        width: person.width,
        height: person.height
      }).save().then(() => {
        person._pivot_top = person.top;
        person._pivot_left = person.left;
        person._pivot_width = person.width;
        person._pivot_height = person.height;
        
        return person;
      });
    } else {
      return new Person({
        name:person.name
      }).save().then((result) => {
        person.id = result.get('id');
        return new ImagePerson({
          image_id: this.params.id,
          person_id: result.id,
          top: person.top,
          left: person.left,
          width: person.width,
          height: person.height
        }).save().then(() => { 
          person._pivot_top = person.top;
          person._pivot_left = person.left;
          person._pivot_width = person.width;
          person._pivot_height = person.height;
          return person
        });
      });
    }
  }

  deletePerson() {
    return ImagePerson.where({
      image_id:this.params.id, 
      person_id:this.params.person_id
    }).destroy().then(() => {
      return Person.query((qb) => {
        qb.whereNotExists(function() {
          this.select('images_persons.id').from('images_persons').whereRaw('persons.id = images_persons.person_id');
        });
      }).destroy();
    });
  }
}

module.exports = PersonsController;