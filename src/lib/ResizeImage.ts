import * as fs from "fs-extra";
import * as sharp from "sharp";
import config from "./config";

export default function(image, target, width, height) {
  const directory = image.year + "/" + image.month;

  return new Promise((resolve, reject) => {
    fs.ensureDir(target + "/" + directory, (err1) => {
      if (err1) {
        return reject(err1);
      }

      sharp(config.getImagesPath() + "/" + image.path)
        .resize(width, height)
        .max().toFile(target + "/" + image.path, (err2) => {
          if (err2) {
            return reject(err2);
          }

          resolve(image);
        });
    });
  });
}
