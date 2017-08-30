import * as bookshelf from "bookshelf";
import * as knex from "knex";
import config from "../lib/Configuration";

const bookshelf2: bookshelf = bookshelf(knex(config.getDatabaseConfiguration()));
bookshelf2.plugin("registry");
export default bookshelf2;
