
exports.up = function(knex) {
  return knex.schema.createTable('tweets', (table) => {
    table.increments();
    table.string('text');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users')
    table.datetime('last_updated_at');
    table.datetime('tweeted_at');
    table.string('id_str');
    table.string('source');
    table.integer('retweet_count');
    table.string('lang');
    table.integer('favorite_count');
    table.boolean('is_quote');
    table.boolean('has_media');
    table.boolean('is_truncated');
    table.timestamps(false, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tweets');
};
