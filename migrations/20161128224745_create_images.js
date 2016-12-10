
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('images', function(table) {
      table.increments().primary();
      table.string('filename');
      table.integer('width');
      table.integer('height');
      table.integer('size');
      table.dateTime('date');
      table.integer('year');
      table.integer('month');
      table.integer('day');
      table.string('path');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
