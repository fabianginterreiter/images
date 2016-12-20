
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('image_tags', function(table) {
      table.increments().primary();
      table.integer('image_id').references('images.id');
      table.integer('tag_id').references('tags.id');
      table.unique(['tag_id', 'image_id']);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
