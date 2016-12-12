"use strict"

var Image = require('../model/Image');

class ImagesController {
  create(object) {

  }

  get(id) {
  }

  index(params) {
    if (!params) {
      params = [];
    }

    return Image.query(function(qb) {
      var where = {};

      if (params.year) {
        where.year = params.year;
      }

      if (params.month) {
        where.month = params.month;
      }

      if (params.day) {
        where.day = params.day;
      }

      qb.where(where);

      qb.orderBy('date','DESC'); 
    }).fetchAll().then((images) => (images.toJSON()));
  }

  destroy(id) {
  }
}

module.exports = new ImagesController();