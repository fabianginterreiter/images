"use strict"

const BaseController = require('./BaseController');
const bookshelf = require('../model/bookshelf')
const Image = require('../model/Image');
const ImagePerson = require('../model/ImagePerson');
const ImagesExtention = require('../lib/ImagesExtention');

class SearchController extends BaseController {
  index() {
    let words = this.query.s.split(" ");

    return Image.query((qb) => {
      qb.select('image_id', 'images.*', 'count')

      qb.join(function() {
        this.select('image_id')
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
            })
            .unionAll(function() {
              this.select('image_id')
                .from('albums_images')
                .join('albums', 'albums.id', 'albums_images.album_id')
                .where(function() {
                  let w = this.where('albums.name', 'like', '%' + words[0] + '%');
                  for (var index = 1; index < words.length; index++) {
                    w.orWhere('albums.name', 'like', '%' + words[index] + '%');
                  }
                })
            })
        })
        .groupBy('image_id')
        .orderBy('count', 'desc')
      }, 'images.id', 'image_id');

      qb.limit(100);
    }).fetchAll({withRelated: ['user', 'tags', 'albums', 'persons']})
    .then((result) => result.toJSON())
    .then((images) => ImagesExtention(images));
  }


}

module.exports = SearchController;