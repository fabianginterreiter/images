
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('albums', function(table) {
      table.increments().primary();
      table.string('name');
      table.integer('user_id').references('users.id');
      table.timestamps();
    }),

    knex.schema.createTable('albums_images', function(table) {
      table.increments().primary();
      table.integer('image_id').references('images.id').onDelete('CASCADE');
      table.integer('album_id').references('albums.id').onDelete('CASCADE');
      table.unique(['album_id', 'image_id']);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
