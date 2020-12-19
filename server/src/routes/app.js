const { createReadStream } = require('fs');

const appMiddleware = async(ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    const path = ctx.request.url;

    if (status == 404 && /app/.test(path)) {
      ctx.type = 'html';
      ctx.body = createReadStream(process.env.BUILD_PATH + "/index.html");
    }
  } catch (err) {
    // continue execution
    console.log('Error resolving unknown path', path);
    console.log(err)
  }
}

module.exports = appMiddleware
