"use strict"

class BaseController {
  constructor(req) {
    this.params = req.params || [];
    this.file = req.file || null;
    this.files = req.files || [];
    this.query = req.query || [];
    this.body = req.body || {};
    this.session = req.session || {};
  }
}

module.exports = BaseController;