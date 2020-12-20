const Router = require('koa-router');
const { v4: uuidv4 } = require('uuid');
const queries = require('../db/queries/users');
const { getTweets, convertJSONToTweet } = require('../lib/twitter');

const router = new Router();
const BASE_URL = `/api/v1/users`;

// GET /api/v1/users
// router.get(BASE_URL, async(ctx) => {
//   try {
//     const users = await queries.getAllUsers();
//     ctx.body = {
//       status: 'success',
//       data: users
//     };
//   } catch (err) {
//     console.log(err)
//   }
// });

// GET /api/v1/users/invites/0000-0000
router.get(`${BASE_URL}/invites/:id`, async (ctx) => {
  try {
    let { id } = ctx.params
    let { email } = ctx.request.query
    const result = await queries.findByInvitationTokenAndEmail(id, email);

    if (result.length) {
      // store the user in the session?

      usr = result[0]
      ctx.session.user_id = usr.id

      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: result
      };
    } else {
      ctx.status = 422
      ctx.body = {
        status: 'error',
        message: 'Invalid Invitation token or email'
      }
    }
  }
  catch(err) {
    console.log(err)
  }

})

// PUT /api/v1/users/:id
router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const user = await queries.updateUser(ctx.params.id, ctx.request.body);
    if (user.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: user
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That user does not exist.'
      };
    }
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

const convertTweets = (tweets, user_id) => {
  return new Promise(async (resolve, reject) => {

    let converted = []
    for(idx=0;idx<tweets.length;idx++) {
      let tweet = tweets[idx];

      let twt = await convertJSONToTweet(tweet, user_id);
      converted.push(twt)
    }
    resolve(converted);

  });
}

// POST /api/v1/users/:id/fetchTweets
router.post(`${BASE_URL}/:id/fetchTweets`, async(ctx) => {

  try {

    let usr = ctx.session.user
    let { id } = ctx.params
    if (usr.id == id) {

      let tweets = await getTweets(usr.oauth_token, usr.oauth_token_secret);
      let savedTweets = await convertTweets(tweets, usr.id);

      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: {
          count: tweets.length,
          tweets: savedTweets
        }
      }
    }
  }
  catch (err) {
    console.log('Error', err)
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }

});

// POST /api/v1/users
router.post(`${BASE_URL}`, async (ctx) => {
  try {
    let { email } = ctx.request.body
    const exists = await queries.findByEmail(email);

    let userData = { email: email, invitation_token: uuidv4() }

    if (!exists.length) {
      const user = await queries.addUser(userData);
      if (user.length) {

        ctx.status = 201;
        ctx.body = {
          status: 'success',
          data: user
        };

      } else {
        ctx.status = 400;
        ctx.body = {
          status: 'error',
          message: 'Something went wrong.'
        };
      }
    }
    else {
      // email already exists
      ctx.status = 422
      ctx.body = {
        status: 'error',
        message: 'You have already signed up!'
      }
    }

  }
  catch (err) {
    console.log(err);
  }
})

module.exports = router;
