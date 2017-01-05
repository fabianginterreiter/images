const Utils = require('../utils/Utils');

class SelectDialogStore extends Utils.Dispatcher {
  constructor() {
    super(null);
  }

  open(title, options) {
    return new Promise((resolve, reject) => {
      this.setObject({
        title:title,
        options:options,
        resolve: resolve,
        reject: reject,
        open: true
      });
    });
  }
}

module.exports = new SelectDialogStore();