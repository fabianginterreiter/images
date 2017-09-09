
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('albums_images', function(table) {
      table.integer('order').defaultTo(0);
      table.boolean('big').defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {

};
