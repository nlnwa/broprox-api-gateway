const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const body = require('koa-json-body');
const error = require('koa-json-error');
const mount = require('koa-mount');
const log = require('./logger');
const routes = require('./routes');
const port = process.env.PORT || '3010';
const host = process.env.HOST || '0.0.0.0';
const prefix = '/api';
const errorOptions = {
  postFormat: (e, obj) => {
    if (process.env.NODE_ENV === 'production') delete obj.stack;
    return obj;
  },
};


app.use(cors({origin: '*'}));
app.use(error(errorOptions));
app.use(body());
routes.forEach((route) => app.use(mount(prefix, route)));

app.listen(
  port,
  host,
  () => log.info(`Listening on ${host}:${port}`));
