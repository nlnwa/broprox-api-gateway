const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const body = require('koa-json-body');
const error = require('koa-json-error');
const mount = require('koa-mount');
const log = require('./logger');
const routes = require('./routes');
const bearer = require('./bearer');
const config = require('./config');


app.use(error(config.error));
app.use(cors(config.cors));
app.use(body());
app.use(bearer(config.bearer))
routes.forEach((route) => app.use(mount(config.prefix, route)));

app.listen(
  config.port,
  config.host,
  () => log.info(`Listening on ${config.host}:${config.port}`));
