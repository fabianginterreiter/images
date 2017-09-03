const dataEn: Object = {
  navigations: {
    all: "All",
    favorites: "Favorites",
    albums: "Albums",
    persons: "Persons",
    tags: "Tags",
    dates: "Dates"
  }
}

const dataDe: Object = {
  navigations: {
    all: "Alle",
    favorites: "Favoriten",
    albums: "Alben",
    persons: "Personen",
    tags: "Tags",
    dates: "Datum"
  }
}

class Translation {
  private translations: { [key:string]: Object; } = {};
  private data: { [key:string]:string;}

  public translate(key) {
    if (this.data[key]) {
      return this.data[key];
    }
    return key;
  }

  public addTranslation(key: string, data: Object) {
    this.translations[key] = data;
  }

  public setLanguage(key: string) {
    this.data = {};
    this.load(this.data, '', this.translations[key]);
    console.log(this.data);
  }

  private load(data: { [key:string]:string;}, path: string, object: object) {
    Object.keys(object).forEach((key) => {
      if (typeof object[key] === "string") {
        data[path + key] = object[key];
      } else {
        this.load(data, key + ".", object[key]);
      }
    });
  }

}

const instance = new Translation();

instance.addTranslation("en", dataEn);
instance.addTranslation("de", dataDe);
instance.setLanguage("de");


export default instance;

export const translate = (key: string) => {
  return instance.translate(key);
}
