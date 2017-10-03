const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const body = require('koa-json-body');
const error = require('koa-json-error');
const log = require('./logger');
const routes = require('./routes');
const port = process.env.PORT || '3010';
const host = process.env.HOST || '0.0.0.0';

app.use(cors({origin: '*'}));
app.use(error());
app.use(body());
routes.forEach((route) => app.use(route));

app.listen(
  port,
  host,
  () => log.info(`Listening on ${host}:${port}`));
