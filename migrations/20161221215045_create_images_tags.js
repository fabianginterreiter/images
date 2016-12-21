
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('images_tags', function(table) {
      table.increments().primary();
      table.integer('image_id').references('images.id').onDelete('CASCADE');
      table.integer('tag_id').references('tags.id').onDelete('CASCADE');
      table.unique(['tag_id', 'image_id']);

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
