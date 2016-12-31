"use strict"

const BaseController = require('./BaseController');

const Image = require('../model/Image');

class DatesController extends BaseController {
  index() {
    return Image.query((qb) => {
      qb.select('images.year', 'images.month', 'images.day');

      qb.count('images.day AS count')

      qb.groupBy('images.year', 'images.month', 'images.day');

      qb.orderBy('images.year', 'DESC');
      qb.orderBy('images.month', 'DESC');
      qb.orderBy('images.day', 'DESC');
    }).fetchAll().then((result => {
      if (true) {
        //return result.toJSON();
      }

      if (result.length === 0) {
        return [];
      }

      let years = [];
      let currentYear = {};
      let currentMonth = {};

      result.forEach((date) => {
        if (date.get('month') !== currentMonth.month) {
          if (currentMonth.month) {
            currentYear.months.push(currentMonth);
          }

          currentMonth = {
            month: date.get('month'),
            days: [],
            count: 0
          }
        }
        
        if (date.get('year') !== currentYear.year) {
          if (currentYear.year) {
            years.push(currentYear);  
          }

          currentYear = {
            year: date.get('year'),
            months: [],
            count: 0
          }
        }

        currentYear.count += date.get('count');
        currentMonth.count += date.get('count');

        currentMonth.days.push({
          day: date.get('day'),
          count: date.get('count')
        });
      });

      currentYear.months.push(currentMonth);
      years.push(currentYear);

      return years;
    }));
  }
}

module.exports = DatesController;