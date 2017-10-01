const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const body = require('koa-json-body');
const error = require('koa-json-error');
const port = process.env.PORT || '3010';
const host = process.env.HOST || '0.0.0.0';

app.use(cors({origin: '*'}));
app.use(error());
app.use(body());
require('./routes').forEach((route) => app.use(route));

app.listen(
  port,
  host,
  () => console.log(`Listening on ${host}:${port}`));
