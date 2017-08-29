import Dispatcher from "../Dispatcher";

export interface DialogStoreOption {
  title: string;
  text: string;
  resolve(boolean);
  reject(boolean);
  open: boolean;
  type?: string;
  icon?: string;
}

export interface DialogStoreSettings {
  type?: string;
  icon?: string;
}

class DialogStore extends Dispatcher<DialogStoreOption> {
  constructor() {
    super(null);
  }

  open(title: string, text: string, settings: DialogStoreSettings = undefined) {
    return new Promise((resolve, reject) => {
      const options: DialogStoreOption = {
        title,
        text,
        resolve,
        reject,
        open: true
      };

      if (settings) {
        options.type = settings.type;
        options.icon = settings.icon;
      }

      this.setObject(options);
    });
  }
}

export default new DialogStore();
