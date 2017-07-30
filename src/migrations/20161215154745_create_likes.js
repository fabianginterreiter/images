
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('likes', function(table) {
      table.increments().primary();
      table.integer('user_id').references('users.id');
      table.integer('image_id').references('images.id');
      table.unique(['user_id', 'image_id']);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
