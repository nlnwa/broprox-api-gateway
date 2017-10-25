const grpc = require('grpc');
const assert = require('assert');
const debug = require('debug')('veidemann-api-gateway:controller');
const uuidv4 = require('uuid/v4');
const client = require('./service');
const log = require('./logger');
const config = require('./config');

function assertMethod(method) {
  assert(typeof client[method] === 'function', method);
  assert(client[method].hasOwnProperty('originalName'), method);
}

function callService(method, args, state) {
  let uuid;
  if (debug.enabled) {
    uuid = uuidv4();
    debug('[ %s ]\t%s (request)\n%O', uuid, method, args);
  }

  const metadata = new grpc.Metadata();
  metadata.set('authorization', state.token || '');

  return new Promise((resolve, reject) => {
    client[method]({...args}, metadata, (error, response) => error ? reject(error) : resolve(response));
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
 * text, every parameter must be converted to the right type according to the
 * protocol definition of the parameter.
 *
 * @param {Object} query Query parameters
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
    query.expand = query.expand === 'true';
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
      ctx.body = await callService(method, ctx.query, ctx.state);
    };
  },

  list(method) {
    assertMethod(method);
    return async (ctx) => ctx.body = await callService(method, {}, ctx.state);
  },

  get(method) {
    assertMethod(method);
    return async (ctx, id) => ctx.body = await callService(method, {id}, ctx.state);
  },

  save(method) {
    assertMethod(method);
    return async (ctx) => {
      ctx.status = 201;
      ctx.body = await callService(method, ctx.request.body, ctx.state);
    };
  },

  update(method) {
    assertMethod(method);
    return async (ctx) => ctx.body = await callService(method, ctx.request.body, ctx.state);
  },

  del(method) {
    assertMethod(method);
    return async (ctx, id) => {
      try {
        ctx.status = 204;
        ctx.body = await callService(method, {id}, ctx.state);
      } catch (error) {
        ctx.throw(403, error.message, error);
      }
    };
  },
};
