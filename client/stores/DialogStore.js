var Dispatcher = require('./Dispatcher');

class DialogStore extends Dispatcher {
  constructor() {
    super(null);
  }

  open(title, text) {
    return new Promise((resolve, reject) => {
      this.setObject({
        title:title,
        text:text,
        resolve: resolve,
        reject: reject,
        open: true
      });
    });
  }
}

module.exports = new DialogStore();