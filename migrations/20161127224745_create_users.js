
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments().primary();
      table.string('name');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
