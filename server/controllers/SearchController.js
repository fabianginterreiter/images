"use strict"

const BaseController = require('./BaseController');
const bookshelf = require('../model/bookshelf')
const Image = require('../model/Image');
const ImagePerson = require('../model/ImagePerson');

class SearchController extends BaseController {
  index() {
    let words = this.query.s.split(" ");

    return bookshelf.knex
      .select('image_id', 'images.*')
      .count('image_id AS count')
      .from(function() {
        this.select('image_id')
          .from('images_persons')
          .join('persons', 'persons.id', 'images_persons.person_id')
          .where(function() {
            let w = this.where('persons.name', 'like', '%' + words[0] + '%');
            for (var index = 1; index < words.length; index++) {
              w.orWhere('persons.name', 'like', '%' + words[index] + '%');
            }
          })
          .unionAll(function() {
            this.select('image_id')
              .from('images_tags')
              .join('tags', 'tags.id', 'images_tags.tag_id')
              .where(function() {
                let w = this.where('tags.name', 'like', '%' + words[0] + '%');
                for (var index = 1; index < words.length; index++) {
                  w.orWhere('tags.name', 'like', '%' + words[index] + '%');
                }
              })
          })//todo: album
      })
      .join('images', 'images.id', 'image_id')
      .groupBy('image_id')
      .orderBy('count', 'desc')
      .then((result) => result);
  }
}

module.exports = SearchController;