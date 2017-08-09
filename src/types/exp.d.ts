
import * as node from "events";
import * as express from "express";

export interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}

declare global {
  namespace Express {
    interface Request {
      file: MulterFile;
      files: MulterFile[];
    }

    interface Session extends SessionData {
      user: number;
    }
  }
}
