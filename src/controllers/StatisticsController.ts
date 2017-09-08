import * as path from "path";
import config from "../lib/Configuration";
import Image from "../model/Image";
import BaseController from "./BaseController";

export default class StatisticsController extends BaseController {
  public index() {
    const object = {
      path: path.resolve(config.getPath()),
      cache: path.resolve(config.getCachePath()),
      images: null
    };

    return new Image().query((qb) => {
      qb.count("id AS count");
      qb.sum("size AS size");
      qb.where("images.deleted", false);
    }).fetch((result) => result.toJSON()).then((count) => {
      object.images = count;
      return object;
    });
  }
}
