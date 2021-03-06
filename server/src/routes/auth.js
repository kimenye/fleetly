const oauth = require('oauth');
const Router = require('koa-router');
const router = new Router();
const sys = require('util');
const { getProfile } = require('../lib/twitter');
const queries = require('../db/queries/users');
const { getTweetsForUserId } = require('../db/queries/tweets');

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
        console.log('Error in requesting', err, results);
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
            console.log('Error in verifying', err)
            // console.log('Error in verifying', sys.inspect(err))
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
  try {
    let { oauth_verifier } = ctx.request.query
    result = await getOauthToken(ctx.session.twitter_token, ctx.session.twitter_secret, oauth_verifier);
    let { access_token, access_token_secret } = result

    let { user_id } = ctx.session
    if (user_id) {
      let profile = await getProfile(access_token, access_token_secret)

      const user = await queries.findById(user_id)[0];

      let updatedUsr = await queries.updateUser(user_id, { uid: profile['id_str'], profile_pic_url: profile['profile_image_url_https'],
        username: profile['screen_name'], oauth_token: access_token, oauth_token_secret: access_token_secret  })
    }

    ctx.redirect('/app/dashboard');
  }
  catch(err) {
    console.log('Error with callback', err)
  }

});

router.get('/auth/twitter/request', async (ctx) => {
  try {
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

router.post('/auth/user/logout', (ctx) => {
  ctx.session.user = null
  ctx.session.user_id = null

  ctx.status = 200
  ctx.body = {
    success: 'success'
  }
});

router.get('/auth/user', async (ctx) => {
  try {
    let { user_id } = ctx.session
    console.log('Authenticating', user_id)
    if (user_id) {
      const user = await queries.findById(user_id);
      const tweets = await getTweetsForUserId(user_id);
      let usr = user[0]

      console.log('User', usr)
      console.log('Tweets', tweets)

      ctx.session.user = usr
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        user: usr,
        tweets: tweets
      };
    }
    else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'No user is available in session'
      };
    }
  }
  catch (err) {
    console.log('Error verifying auth', err)
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

module.exports = router;
