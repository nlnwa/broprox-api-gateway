const client = require('./service');
const assert = require('assert');
const log = require('./logger');

function assertMethod(method) {
  assert(typeof client[method] === 'function', method);
  assert(client[method].hasOwnProperty('originalName'), method);
}

function callService(method, param) {
  log.debug(method, param);

  return new Promise((resolve, reject) => {
    param = Object.assign({}, param);
    client[method](param, (error, response) => error ? reject(error) : resolve(response));
  })
    .then((response) => {
      log.trace(response);
      return response;
    })
    .catch((error) => {
      log.error(error.message);
      throw error;
    });
}

module.exports = {

  search(method) {
    assertMethod(method);
    return async (ctx) => {
      if (ctx.query.selector) {
        try {
          ctx.query.selector = JSON.parse(ctx.query.selector);
        } catch (error) {
          ctx.throw(400, error.message);
        }
      }
      ctx.body = await callService(method, ctx.query);
    };
  },

  list(method) {
    assertMethod(method);
    return async (ctx) => ctx.body = await callService(method, {});
  },

  get(method) {
    assertMethod(method);
    return async (ctx, id) => ctx.body = await callService(method, {id});
  },

  save(method) {
    assertMethod(method);
    return async (ctx) => {
      ctx.status = 201;
      ctx.body = await callService(method, ctx.request.body);
    };
  },

  update(method) {
    assertMethod(method);
    return async (ctx) => ctx.body = await callService(method, ctx.request.body);
  },

  del(method) {
    assertMethod(method);
    return async (ctx, id) => {
      try {
        ctx.status = 204;
        ctx.body = await callService(method, {id});
      } catch (error) {
        ctx.throw(403, error.message, error);
      }
    };
  },
};
