
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').unique().notNullable();
    table.string('invitation_token');
    table.string('name');
    table.string('uid');
    table.string('username');
    table.string('profile_pic_url');
    table.string('oauth_token');
    table.timestamps(false, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
