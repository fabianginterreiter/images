
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tags', function(table) {
      table.increments().primary();
      table.string('name');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
