const knex = require('../connection');

function getTweetsForUserId(id) {
  return knex('tweets')
  .select('*')
  .where({ user_id: id })
}

function createTweet(tweet) {
  return knex('tweets')
  .insert(tweet)
  .returning('*');
}

module.exports = {
  getTweetsForUserId,
  createTweet
}
