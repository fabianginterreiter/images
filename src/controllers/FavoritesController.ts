import Like from "../model/Like";
import BaseController from "./BaseController";

export default class FavoritesController extends BaseController {
  public like() {
    return new Like({image_id: this.params.id, user_id: this.session.user}).save().then((result) => (result.toJSON()));
  }

  public unlike() {
    return new Like().where({image_id: this.params.id, user_id: this.session.user}).destroy();
  }
}
