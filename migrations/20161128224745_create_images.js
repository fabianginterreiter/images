
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('images', function(table) {
      table.increments().primary();
      table.string('filename');
      table.string('title');
      table.integer('width');
      table.integer('height');
      table.integer('size');
      table.dateTime('date');
      table.integer('year');
      table.integer('month');
      table.integer('day');
      table.string('path');
      table.integer('user_id').references('users.id');
      table.boolean('deleted').defaultTo(false);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
