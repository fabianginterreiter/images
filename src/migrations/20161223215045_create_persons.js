
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('persons', function(table) {
      table.increments().primary();
      table.string('name');
      table.timestamps();
    }),

    knex.schema.createTable('images_persons', function(table) {
      table.increments().primary();
      table.integer('image_id').references('images.id').onDelete('CASCADE');
      table.integer('person_id').references('persons.id').onDelete('CASCADE');
      table.unique(['person_id', 'image_id']);
      
      table.float('left');
      table.float('top');
      table.float('width');
      table.float('height');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  
};
