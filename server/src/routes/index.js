const Router = require('koa-router');
const router = new Router();

router.get('/status', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'ok'
  };
});

module.exports = router;
