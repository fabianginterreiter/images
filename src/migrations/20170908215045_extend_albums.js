
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable("albums_images", function(table) {
      table.integer("order").defaultTo(0);
      table.boolean("big").defaultTo(false);
      table.text("text").defaultTo(null);
      table.dropUnique(["album_id", "image_id"]);
    }),

    knex.schema.alterTable("albums", function(table) {
      table.text("description").defaultTo("");
    })
  ]);
};

exports.down = function(knex, Promise) {

};
