import * as Express from "express";
import * as fs from "fs-extra";
import * as sharp from "sharp";
import config from "../lib/Configuration";
import ResizeImage from "../lib/ResizeImage";
import Image from "../model/Image";
import User from "../model/User";
import BaseController from "./BaseController";

export default class CacheController extends BaseController {
  public getThumbnail(res: Express.Response) {
    console.log("Create Thumbnail: " + this.path);
    this.resize(res, this.path.substring(8), config.getThumbnailPath(), 1000, 200);
  }

  public getPreview(res: Express.Response) {
    console.log("Create Preview: " + this.path);
    this.resize(res, this.path.substring(5), config.getPreviewPath(), 2000, 2000);
  }

  private resize(res: Express.Response, image: string, target: string, width: number, height: number) {
    const directory = image.substring(0, image.lastIndexOf("/"));

    fs.ensureDir(target + "/" + directory, (err) => {
      if (err) {
        return res.status(500).send("Could not create directory.");
      }

      sharp(config.getImagesPath() + "/" + image)
        .resize(width, height)
        .max().toFile(target + "/" + image, (err2) => {
          if (err2) {
            return res.status(500).send("Could not resize image.");
          }

          res.sendFile(process.cwd() + "/" + target + "/" + image);
        });
    });
  }
}
