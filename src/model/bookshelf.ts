import * as bookshelf from "bookshelf";
import * as knex from "knex";

const knex2: knex = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/data.sqlite3"
  },
  // debug: true,
  useNullAsDefault: true
}); // require("../config").getDatabaseConfiguration()

const bookshelf2: bookshelf = bookshelf(knex2);
bookshelf2.plugin("registry");
export default bookshelf2;
