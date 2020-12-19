const knex = require('../../src/db/connection');
const { getAllUsers } = require('../../src/db/queries/users');
const { convertJSONToTweet } = require('../../src/lib/twitter');
const chai = require('chai');
const should = chai.should();

describe('Twitter data models', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe("Normalize twitter data into model for saving", () => {

    it("Can convert a tweet json into tweet to be saved", () => {
      let json = {
        created_at: 'Mon Feb 03 12:14:03 +0000 2020',
        id: 1224305041940545500,
        id_str: '1224305041940545537',
        text: 'Anyone within the boundaries of Kenya enjoys the protection of the Data Protection Act, as long as they reside in K… https://t.co/jmXSmCet2P',
        truncated: true,
        entities: { hashtags: [], symbols: [], user_mentions: [], urls: [Array] },
        source: '<a href="https://about.twitter.com/products/tweetdeck" rel="nofollow">TweetDeck</a>',
        user: { id: 2459973444, id_str: 'twitter_id' },
        is_quote_status: false,
        retweet_count: 1,
        favorite_count: 0,
        favorited: false,
        retweeted: false,
        possibly_sensitive: false,
        lang: 'en'
      }

      getAllUsers().then((usrs) => {
        let usr = usrs[0];

        convertJSONToTweet(json, usr.id)
          .then(tweet => {
            tweet.lang.should.eql('en');
            tweet.source.should.eql('TweetDeck');
          })

      })
    })
  })
})
