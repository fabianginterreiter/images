import * as fs from "fs-extra";
import config from "../config";

export default function(file, image) {
  const directory = image.year + "/" + image.month;
  image.path = directory + "/" + image.filename;

  return new Promise((resolve, reject) => {
    fs.ensureDir(config.getImagesPath() + "/" + directory, (err1) => {
      if (err1) {
        return reject(err1);
      }

      fs.copy(file, config.getImagesPath() + "/" + image.path, (err2) => {
        if (err2) {
          return reject(err2);
        }

        fs.unlink(file, (err3) => {
          if (err3) {
            return reject(err3);
          }

          resolve(image);
        });
      });
    });
  });
}
