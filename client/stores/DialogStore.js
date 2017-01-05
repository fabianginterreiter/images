const Utils = require('../utils/Utils');

class DialogStore extends Utils.Dispatcher {
  constructor() {
    super(null);
  }

  open(title, text, settings) {
    return new Promise((resolve, reject) => {
      var options = {
        title:title,
        text:text,
        resolve: resolve,
        reject: reject,
        open: true
      };

      if (settings) {
        options.type = settings.type
        options.icon = settings.icon;
      }

      this.setObject(options);
    });
  }
}

module.exports = new DialogStore();