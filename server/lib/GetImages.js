var Image = require('../model/Image');

module.exports = function(params) {
  if (!params) {
    params = [];
  }

  return new Promise(function(resolve, reject) {
    Image.query(function(qb) {
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
    }).fetchAll().then(function(images) {
      resolve(images.toJSON());
    }).catch(function(e) {
      reject(e);
    });
  });
};