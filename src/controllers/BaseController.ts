import * as express from "express";

export default class BaseController {
  protected params: any;
  protected file: any;
  protected files: any;
  protected query: any;
  protected body: any;
  protected path: string;
  protected session: Express.Session;

  public constructor(req: express.Request) {
    this.params = req.params || [];
    this.file = req.file || null;
    this.files = req.files || [];
    this.query = req.query || [];
    this.body = req.body || {};
    this.path = decodeURI(req.path);
    this.session = req.session || {} as Express.Session;
  }

  protected isAuthenticated() {
    return this.session.user && this.session.user > 0;
  }
}
