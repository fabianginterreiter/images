import User from "../model/User";
import BaseController from "./BaseController";

export default class UsersController extends BaseController {
  public create() {
    return new User({
      name: this.body.name
    }).save().then((result) => (result.toJSON()));
  }

  public get() {
    return new User({id: this.params.id}).fetch().then((result) => (result.toJSON()));
  }

  public index() {
    return User.fetchAll().then((result) => (result.toJSON()));
  }

  public destroy() {
    return new User({id: this.params.id}).fetch().then((result) => {
      return new User({id: this.params.id}).destroy().then(() => {
        return result.toJSON();
      });
    });
  }
}
