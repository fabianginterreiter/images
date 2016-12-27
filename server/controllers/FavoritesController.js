"use strict"

const BaseController = require('./BaseController');

const Like = require('../model/Like');

class FavoritesController extends BaseController {
  like() {
    return new Like({image_id:this.params.id, user_id:this.session.user}).save().then((result) => (result.toJSON()));
  }

  unlike() {
    return Like.where({image_id:this.params.id, user_id:this.session.user}).destroy();
  }
}

module.exports = FavoritesController;