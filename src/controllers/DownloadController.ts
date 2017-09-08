import * as Archiver from "archiver";
import * as Express from "express";
import * as sharp from "sharp";
import config from "../lib/Configuration";
import Image from "../model/Image";
import BaseController from "./BaseController";

export default class DownloadController extends BaseController {
  public getImages(res: Express.Response) {
    new Image().query((qb) => {
      qb.select("images.*");
      qb.whereIn("id", this.params.ids.split("+"));
    }).fetchAll().then((images) => this.generateZipForImages(res, images.toJSON()));
  }

  private generateZipForImages(res: Express.Response, images) {
    const maxWidth = this.query.width ? parseInt(this.query.width) : 0;
    const maxHeight = this.query.height ? parseInt(this.query.height) : 0;

    const archive = Archiver("zip");
    archive.pipe(res);

    const name = "images.zip";

    res.writeHead(200, {
        "Content-Type": "application/zip",
        "Content-disposition": "attachment; filename=" + name
    });

    Promise.all(images.map((image) => {
      const p = sharp(config.getImagesPath() + "/" + image.path).withMetadata();

      if (maxWidth > 0 || maxHeight > 0) {
        p.resize(maxWidth, maxHeight).max();
      }

      return new Promise((resolve, reject) => {
        p.rotate().toBuffer((err, buffer) => {
          if (err) {
            return reject(err);
          }

          archive.append(buffer, { name: image.filename });
          resolve();
        });
      });
    })).then(() => archive.finalize()).catch((e) => {
      console.log(e);
      res.send(e);
    });
  }
}
