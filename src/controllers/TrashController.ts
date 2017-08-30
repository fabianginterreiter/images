import * as fs from "fs";
import config from "../lib/Configuration";
import Image from "../model/Image";
import BaseController from "./BaseController";

export default class TrashController extends BaseController {
  public clear() {
    return new Image().where("deleted", true).fetchAll().then((results) => {
      const promises = [];

      results.forEach((result) => {
        promises.push(this.deleteImage(result.get("id")));
      });

      return Promise.all(promises);
    });
  }

  public deleteImage(id) {
    return new Promise((resolve, reject) => {
      new Image({id}).fetch()
      .then((image) => {
        return new Image({id}).destroy().then(() => {
          fs.unlink(config.getImagesPath() + "/" + image.get("path"), (err) => {
            if (err) {
              return reject(err);
            }

            fs.unlink(config.getThumbnailPath() + "/" + image.get("path"), (err2) => {
              if (err2) {
                return reject(err2);
              }

              fs.unlink(config.getPreviewPath() + "/" + image.get("path"), (err3) => {
                if (err3) {
                  return reject(err3);
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
