import * as moment from "moment";
import Album from "../model/Album";
import bookshelf from "../model/bookshelf";
import Image from "../model/Image";
import Person from "../model/Person";
import Tag from "../model/Tag";
import BaseController from "./BaseController";

export default class NavigationsController extends BaseController {

  public index() {

    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated()) {
        resolve([]);
      }

      this.addAlbums([])
      .then((options) => this.addPersons(options))
      .then((options) => this.addTags(options))
      .then((options) => this.addDates(options))
      .then((options) => this.addTrash(options))
      .then((options) => resolve(options));
    });
  }

  private addTrash(options) {
    return new Image().where("deleted", true).fetchAll().then((results) => {
      if (results.length === 0) {
        return options;
      }

      options.push({
        type: "divider"
      });

      options.push({
        key: "trash",
        type: "action",
        name: "Trash",
        link: "/images/trash",
        service: "/api/images?trash=true",
        fontAwesome: "fa fa-trash-o"
      });

      return options;
    });
  }

  private addDates(options) {
    return bookshelf.knex("images")
    .distinct("year", "month").select().orderBy("year", "desc")
    .orderBy("month", "desc").then((result) => {
      let year = null;
      const years = [];
      let months = [];
      result.forEach((date) => {
        if (!year) {
          year = date.year;
        }

        if (year !== date.year) {
          years.push({
            key: "date" + year,
            type: "action",
            link: "/images/dates/" + year,
            name: "" + year,
            options: months
          });
          months = [];
          year = date.year;
        }

        months.push({
          key: "date" + year + date.month,
          type: "action",
          name: moment().month(date.month - 1).year(year).format("MMMM YYYY"),
          link: "/images/dates/" + year + "/" + date.month
        });
      });

      years.push({
        key: "date" + year,
        type: "action",
        link: "/images/dates/" + year,
        name: "" + year,
        options: months
      });

      if (years.length > 0) {
        options.push({
          key: "dates",
          type: "action",
          name: "Dates",
          fontAwesome: "fa fa-calendar",
          link: "/images/dates",
          options: years
        });
      }

      return options;
    });
  }

  private addTags(options) {
    return new Tag().query((qb) => {
      qb.orderBy("name", "asc");
    }).fetchAll().then((tags) => tags.toJSON()).then((tags) => {
      const result = {
        key: "tags",
        type: "action",
        name: "Tags",
        link: "/images/tags",
        fontAwesome: "fa fa-tags",
        options: []
      };

      tags.forEach((tag) => result.options.push({
        key: "tag_" + tag.id,
        type: "action",
        name: tag.name,
        link: "/images/tags/" + tag.id
      }));

      if (result.options.length > 0) {
        options.push(result);
      }

      return options;
    });
  }

  private addPersons(options) {
    return new Person().query((qb) => {
      qb.orderBy("name", "asc");
    }).fetchAll().then((persons) => persons.toJSON()).then((persons) => {
      const result = {
        key: "persons",
        type: "action",
        name: "Persons",
        link: "/images/persons",
        fontAwesome: "fa fa-users",
        options: []
      };

      persons.forEach((person) => result.options.push({
        key: "person_" + person.id,
        type: "action",
        name: person.name,
        link: "/images/persons/" + person.id
      }));

      if (result.options.length > 0) {
        options.push(result);
      }

      return options;
    });
  }

  private addAlbums(options) {
    return new Album().query((qb) => {
      qb.where("user_id", this.session.user).orWhere("public", ">", 0);
      qb.orderBy("name", "asc");
    }).fetchAll().then((albums) => albums.toJSON()).then((albums) => {
      const result = {
        key: "albums",
        type: "action",
        name: "Albums",
        link: "/images/albums",
        fontAwesome: "fa fa-book",
        options: []
      };

      albums.forEach((album) => result.options.push({
        key: "album_" + album.id,
        type: "action",
        name: album.name,
        link: "/images/albums/" + album.id
      }));

      if (result.options.length > 0) {
        options.push(result);
      }

      return options;
    });
  }
}
