const client = require('./service');
const assert = require('assert');
const log = require('./logger');
const debug = require('debug')('service');
const uuidv4 = require('uuid/v4');

function assertMethod(method) {
  assert(typeof client[method] === 'function', method);
  assert(client[method].hasOwnProperty('originalName'), method);
}

function callService(method, param) {
  let uuid;
  if (debug.enabled) {
    uuid = uuidv4();
    debug('[ %s ]\t%s (request)\n%O', uuid, method, param);
  }
  return new Promise((resolve, reject) => {
    param = Object.assign({}, param);
    client[method](param, (error, response) => error ? reject(error) : resolve(response));
  })
    .then((response) => {
      debug('[ %s ]\t%s (response)\n%O', uuid, method, response);
      return response;
    })
    .catch((error) => {
      log.error(error.message);
      throw error;
    });
}

/**
 * gRPC server expects a typed request message. since JSON is transferred as
 * text, every parameter must be converted to the right type according to then
 * protocol definition of the message.
 *
 * @parameter {Object} ctx
 */
function convertQueryParameters(query) {
  if (!query) {
    return;
  }
  // selector
  if (query.selector !== undefined) {
    try {
      query.selector = JSON.parse(query.selector);
    } catch (error) {
      throw new Error('Parameter selector: ' + error.message);
    }
  }
  // page_size
  if (query.page_size !== undefined) {
    query.page_size = parseInt(query.page_size);
    if (isNaN(query.page_size)) throw new Error('Parameter page_size: Not a number');
  }
  // page
  if (query.page !== undefined) {
    query.page = parseInt(query.page);
    if (isNaN(query.page)) throw new Error('Parameter page: Not a number');
  }
  // expand
  if (query.expand !== undefined) {
    query.expand = query.expand === 'true' ? true: false;
  }
}

module.exports = {

  search(method) {
    assertMethod(method);
    return async (ctx) => {
      try {
        convertQueryParameters(ctx.query);
      } catch (error) {
        ctx.throw(400, error.message);
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
