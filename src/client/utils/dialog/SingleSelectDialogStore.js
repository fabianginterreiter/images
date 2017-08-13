import Dispatcher from '../Dispatcher'

class SelectDialogStore extends Dispatcher {
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

export default new SelectDialogStore();
