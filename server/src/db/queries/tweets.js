const knex = require('../connection');

function getTweetsForUserId(id) {
  return knex('tweets')
  .select('*')
  .where({ user_id: id })
  .orderBy('tweeted_at', 'desc')
  .orderBy('retweet_count', 'desc')
  .orderBy('favorite_count', 'desc')
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
