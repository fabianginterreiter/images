"use strict"

const BaseController = require('./BaseController');
const bookshelf = require('../model/bookshelf')
const Image = require('../model/Image');
const ImagePerson = require('../model/ImagePerson');

class SearchController extends BaseController {
  index() {
    let words = this.query.s.split(" ");

    return ImagePerson.query((qb) => {
      qb.select('images_persons.image_id');
      qb.count('images_persons.image_id AS count');
      qb.join('persons', 'persons.id', 'images_persons.person_id')

      qb.where('persons.name', 'like', '%' + words[0] + '%');

      for (var index = 1; index < words.length; index++) {
        qb.orWhere('persons.name', 'like', '%' + words[index] + '%');
      }

      qb.groupBy('images_persons.image_id');
      qb.orderBy('count', 'desc');
      qb.debug(true);
    }).fetchAll().then((result) => result.toJSON());
  }

 
}

module.exports = SearchController;