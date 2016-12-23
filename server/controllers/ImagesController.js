"use strict"

const Image = require('../model/Image');
const Like = require('../model/Like');
const ImageTag = require('../model/ImageTag');
const Tag = require('../model/Tag');
const Person = require('../model/Person');
const ImagePerson = require('../model/ImagePerson');

var fs = require('fs');
var config = require('../config');

var ImageInfo = require('../lib/ImageInfo');
var CopyImageFile = require('../lib/CopyImageFile');
var ResizeImage = require('../lib/ResizeImage');
var BaseController = require('./BaseController');

class ImagesController extends BaseController {
  create() {
    return ImageInfo(this.file.path).then(function(info) {
      var result = {
        filename: this.file.originalname, 
        size: this.file.size
      };

      result.width = info.width;
      result.height = info.height;
      result.date = info.date;

      result.year = result.date.getFullYear();
      result.month = result.date.getMonth() + 1;
      result.day = result.date.getDate();

      result.user_id = this.session.user;

      return CopyImageFile(this.file.path, result);
    }.bind(this)).then(function(result) {
      return ResizeImage(result, config.getThumbnailPath(), 1000, 200);
    }).then(function(result) {
      return ResizeImage(result, config.getPreviewPath(), 2000, 2000);
    }).then(function(result) {
      return new Image(result).save();
    }).then((result) => (result.toJSON()));
  }

  get() {
    return Image.query((qb) => {
      qb.select('images.*')

      qb.select('likes.user_id AS liked');
      var userId = this.session.user;
      qb.leftJoin('likes', function() {
        this.on('images.id', 'likes.image_id')
        this.on('likes.user_id', userId);
      });

      qb.where('images.id', this.params.id);
    }).fetch({withRelated: ['user', 'tags']}).then((image) => {
      return image.toJSON()
    }).then((image) => this.__transformImage(image)).catch((e) => console.log(e));
  }

  __transformImage(image) {
    image.liked = image.liked > 0;
    return image;
  }

  __transformImages(images) {
    images.forEach((image) => this.__transformImage(image));
    return images;
  }

  like() {
    return new Like({image_id:this.params.id, user_id:this.session.user}).save().then((result) => (result.toJSON()));
  }

  unlike() {
    return Like.where({image_id:this.params.id, user_id:this.session.user}).destroy();
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
      }).save().then(() => person);
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
        }).save().then(() => person);
      });
    }
  }

  deletePerson() {
    return ImagePerson.where({image_id:this.params.id, person_id:this.params.person_id}).destroy().then(() => {
      return Person.query((qb) => {
        qb.debug(true);
        qb.whereNotExists(function() {
          this.select('images_persons.id').from('images_persons').whereRaw('persons.id = images_persons.person_id');
        });
      }).destroy();
    });
  }

  addTag() {
    var tag = this.body;

    if (tag.id) {
      return new ImageTag({
        tag_id: tag.id,
        image_id: this.params.id
      }).save().then(() => tag);
    } else {
      return new Tag({
        name:tag.name
      }).save().then((tag) => {
        return new ImageTag({
          tag_id: tag.get('id'),
          image_id: this.params.id
        }).save().then(() => tag.toJSON());
      });
    }
  }

  deleteTag() {
    return ImageTag.where({image_id:this.params.id, tag_id:this.params.tag_id}).destroy().then(() => {
      return Tag.query((qb) => {
        qb.debug(true);
        qb.whereNotExists(function() {
          this.select('images_tags.id').from('images_tags').whereRaw('tags.id = images_tags.tag_id');
        });
      }).destroy();
    });
  }

  index() {
    return Image.query((qb) => {
      var query = this.query;

      qb.select('images.*');

      var userId = this.session.user;
      qb.select('likes.user_id AS liked');
      if (this.query.liked) {
        qb.join('likes', function() {
          this.on('images.id', 'likes.image_id')
          this.on('likes.user_id', userId);
        });
      } else {
        qb.leftJoin('likes', function() {
          this.on('images.id', 'likes.image_id')
          this.on('likes.user_id', userId);
        });
      }

      if (query.tag) {
        qb.join('images_tags', function() {
          this.on('images.id', 'images_tags.image_id'),
          this.on('images_tags.tag_id', query.tag);
        });
      }

      if (query.person) {
        qb.join('images_persons', function() {
          this.on('images.id', 'images_persons.image_id'),
          this.on('images_persons.person_id', query.person);
        });
      }

      var where = {};

      if (this.query.year) {
        where.year = this.query.year;
      }

      if (this.query.month) {
        where.month = this.query.month;
      }

      if (this.query.day) {
        where.day = this.query.day;
      }

      qb.where(where);

      qb.orderBy('date','DESC'); 
    }).fetchAll({withRelated: ['user', 'tags', 'persons']}).then((images) => (images.toJSON())).then((images) => this.__transformImages(images));
  }

  destroy() {
    var id = this.params.id;
    return new Promise(function(resolve, reject) {
      new Image({'id': id}).fetch()
      .then(function(image) {
        return new Image({'id': id}).destroy().then(function() {
          fs.unlink(config.getImagesPath() + '/' + image.get('path'), function(err) {
            if (err) {
              return reject(err);
            }

            fs.unlink(config.getThumbnailPath() + '/' + image.get('path'), function(err) {
              if (err) {
                return reject(err);
              }

              fs.unlink(config.getPreviewPath() + '/' + image.get('path'), function(err) {
                if (err) {
                  return reject(err);
                }

                resolve(image.toJSON());
              });
            });
          });
        });
      });
    });
  }
}

module.exports = ImagesController;