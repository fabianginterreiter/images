import Ajax from "../libs/Ajax";
import {Option} from "../utils/component/OptionsList";
import {Dispatcher} from "../utils/Utils";

class NavigationsStore extends Dispatcher<Option[]> {
  constructor() {
    super([]);

    this.load();
  }

  public load() {
    Ajax.get("/api/navigations").then((result) => {
      const navigations = [];

      navigations.push({
        key: "all",
        type: "action",
        name: "All",
        service: "/api/images",
        link: "/images/",
        fontAwesome: "fa fa-picture-o"
      });

      navigations.push({
        key: "favorites",
        type: "action",
        name: "Favorites",
        service: "/api/images?liked=true",
        link: "/images/favorites",
        fontAwesome: "fa fa-heart-o"
      });

      navigations.push({
        type: "divider"
      });

      result.forEach((option) => (navigations.push(option)));

      this.setObject(navigations);
    });
  }

  public getOption(path: string) {
    return this.__getOption(this.getObject(), path);
  }

  private __getOption(options, path) {
    if (!options) {
      return null;
    }

    for (let index = 0; index < options.length; index++) {
      if (options[index].link === path) {
        return options[index];
      }

      const child = this.__getOption(options[index].options, path);
      if (child) {
        return child;
      }
    }

    return null;
  }
}

export default new NavigationsStore();
