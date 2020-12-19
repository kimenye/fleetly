const Twitter = require('twitter');

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

module.exports = {
  getProfile
}
