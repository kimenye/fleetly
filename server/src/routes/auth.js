const oauth = require('oauth');
const Router = require('koa-router');
const router = new Router();
const sys = require('util');

const consumer = () => {
  return new oauth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
     process.env.TWITTER_API_KEY,
     process.env.TWITTER_API_SECRET_KEY,
     "1.0A",
     process.env.HOSTPATH+'/auth/twitter/callback',
     "HMAC-SHA1"
   )
}

const requestToken = () => {
  return new Promise((resolve, reject) => {
    // console.log('Requesting token');
    consumer().getOAuthRequestToken((err, token, secret, results) => {
      if (err) {
        console.log('Error in requesting', sys.inspect(error), results);
        reject(err);
      }
      else {
        resolve({ token: token, secret: secret });
      }
    });
  });
}

const getOauthToken = (requestToken, requestSecret, verifier) => {
  return new Promise((resolve, reject) => {
    // console.log('Verifying oauth token: ', verifier);

    consumer()
      .getOAuthAccessToken(
        requestToken,
        requestSecret,
        verifier,
        (err, oauthAccessToken, oauthAccessTokenSecret, results) => {
          if (err) {
            console.log('Error in verifying', sys.inspect(err))
            reject(err)
          }
          else {
            console.log('Success!');
            resolve({ access_token: oauthAccessToken, access_token_secret: oauthAccessTokenSecret });
          }
        })
  });
}

router.get('/auth/twitter/callback', async (ctx) => {
  // console.log('In twitter callback');

  try {
    let { oauth_verifier } = ctx.request.query
    result = await getOauthToken(ctx.session.twitter_token, ctx.session.twitter_secret, oauth_verifier);
    // console.log('Result', result);
    ctx.redirect('/app');
  }
  catch(err) {
    console.log('Error with callback', err)
  }

});

router.get('/auth/twitter/request', async (ctx) => {
  try {
    // console.log('Path', process.env.HOSTPATH+'/auth/twitter/callback')
    result = await requestToken();
    // console.log('Result', result);

    ctx.session.twitter_token = result.token
    ctx.session.twitter_secret = result.secret

    ctx.redirect(`https://api.twitter.com/oauth/authorize?oauth_token=${result.token}`);
  }
  catch (e) {
    console.log('Error requesting oauth', e);
  }
});

module.exports = router;
