const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require('koa-cors');
const HttpStatus = require("http-status");
const session = require('koa-session');
const SESSION_CONFIG = require('./config/session');
require('dotenv').config();

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const appRoutes = require('./routes/app');
const authRoutes = require('./routes/auth');

const app = new Koa();
const PORT = process.env.PORT || 3000;
// Add the client build
const path = __dirname + "/../../client/build"
process.env.BUILD_PATH = path;

app.keys = [process.env.SESSION_KEY]

// add middlewares
app.use(session(app))
app.use(BodyParser());
app.use(Logger());
app.use(cors());

// app routes middleware
app.use(appRoutes);

app.use(indexRoutes.routes());
app.use(userRoutes.routes());
app.use(authRoutes.routes());

const static_pages = new Koa();

static_pages.use(serve(path));
app.use(mount("/", static_pages))

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
