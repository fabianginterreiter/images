"use strict"

import Utils from '../utils/Utils';
import Ajax from '../libs/Ajax'

class NavigationsStore extends Utils.Dispatcher {
  constructor() {
    super([]);

    this.load();
  }

  load() {
    Ajax.get('/api/navigations').then((result) => {
      var navigations = [];

      navigations.push({
        key: 'all',
        type: 'action',
        name: 'All',
        service: '/api/images',
        link: '/images/',
        fontAwesome: 'fa fa-picture-o'
      });

      navigations.push({
        key: 'favorites',
        type: 'action',
        name: 'Favorites',
        service: '/api/images?liked=true',
        link: '/images/favorites',
        fontAwesome: 'fa fa-heart-o'
      });

      navigations.push({
        type: 'divider'
      });

      result.forEach((option) => (navigations.push(option)));

      this.setObject(navigations);
    });
  }

  getOption(path) {
    return this.__getOption(this.getObject(), path);
  }

  __getOption(options, path) {
    if (!options) {
      return null;
    }

    for (var index = 0; index < options.length; index++) {
      if (options[index].link === path) {
        return options[index];
      }

      var child = this.__getOption(options[index].options, path);
      if (child) {
        return child;
      }
    }

    return null;
  }


}

module.exports = new NavigationsStore();