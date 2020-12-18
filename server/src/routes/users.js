const Router = require('koa-router');
const { v4: uuidv4 } = require('uuid');
const queries = require('../db/queries/users');

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

// POST /api/v1/users
router.post(`${BASE_URL}`, async (ctx) => {
  try {
    // console.log('email', ctx.request.body.email)
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
