
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').unique().notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
