
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
      table.boolean('horizontal').defaultTo(false);
      table.integer('user_id').references('users.id');
      table.boolean('deleted').defaultTo(false);
      table.integer('version').defaultTo(1);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
