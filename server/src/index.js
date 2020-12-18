const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require('koa-cors');
const HttpStatus = require("http-status");
const indexRoutes = require('./routes/index');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());

const static_pages = new Koa();

// Add the client build
const path = __dirname + "/../../client/build"
static_pages.use(serve(path));
app.use(mount("/", static_pages))

// add middlewares
app.use(BodyParser());
app.use(Logger());
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
