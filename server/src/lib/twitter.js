const Twitter = require('twitter');
const { createTweet } = require('../db/queries/tweets');

const getClient = (token, secret) => {
  return new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token_key: token,
    access_token_secret: secret
  })
}


const getProfile = (oauthToken, oauthSecret) => {
  return new Promise(function(resolve, reject) {

    let client = getClient(oauthToken, oauthSecret);
    client.get('/account/verify_credentials.json', function(err, data, resp) {
      if (err)
        reject(err)
      else
        resolve(data)
    })
  });
};

const getTweets = (oauthToken, oauthSecret) => {
  return new Promise((resolve, reject) => {

    let client = getClient(oauthToken, oauthSecret);
    client.get('/statuses/user_timeline.json?include_rts=false&trim_user=true&count=200', (err, data, resp) => {
      if (err)
        reject(err)
      else
        resolve(data)
    })
  })
};

const getTweetSource = function(url) {
  let urlPattern = /([^+>]*)[^<]*(<a [^>]*(href="([^>^\"]*)")[^>]*>)([^<]+)(<\/a>)/gi;
  return url.replace(urlPattern, function(fullText, beforeLink, anchorContent, href, lnkUrl, linkText, endAnchor){
                    return linkText;
                });
}

const convertJSONToTweet = (json, user_id) => {
  return new Promise((resolve, reject) => {
    let tweet = {
      id_str: json.id_str,
      text: json.text,
      is_truncated: json.truncated,
      last_updated_at: new Date(),
      source: getTweetSource(json.source),
      retweet_count: json.retweet_count,
      favorite_count: json.favorite_count,
      is_quote: json.is_quote_status,
      user_id: user_id,
      lang: json.lang,
      tweeted_at: new Date(json.created_at)
    }

    createTweet(tweet)
      .then(resp => {
        resolve(resp[0]);
      })
  });
};

module.exports = {
  getProfile,
  getClient,
  getTweets,
  convertJSONToTweet
}
