const grpc = require('grpc');
const assert = require('assert');
const debug = require('debug')('veidemann-api-gateway:controller');
const uuidv4 = require('uuid/v4');
const log = require('./logger');

/**
 * Call the gRPC service method with provided arguments.
 *
 * Adds authorization metadata if a bearer token was sent from the client.
 *
 * @param {Object} service gRPC service to call
 * @param {string} method gRPC method being called
 * @param {Object} args Arguments to the method
 * @param {Object} ctx Koa context object
 * @return {Promise<any>}
 */
function call(service, method, args, ctx) {
  let uuid;
  if (debug['enabled']) {
    uuid = uuidv4();
    debug('[ %s ]\t%s (request)\n%O', uuid, method, args);
  }

  const hasToken = !!ctx.state.token;

  return new Promise((resolve, reject) => {
    if (hasToken) {
      const metadata = new grpc.Metadata();
      metadata.set('authorization', ctx.state.token);

      return service[method]({...args}, metadata,
        (error, response) => error ? reject(error) : resolve(response));
    } else {
      return service[method]({...args}, (error, response) => error ? reject(error) : resolve(response));
    }
  })
    .then((response) => {
      debug('[ %s ]\t%s (response)\n%O', uuid, method, response);
      return response;
    })
    .catch((error) => {
      // Here we can convert gRPC status codes to HTTP status codes
      // see (https://github.com/grpc/grpc-go/blob/master/codes/codes.go)
      switch (error.code) {
        case grpc.status.UNAUTHENTICATED:
          if (hasToken) {
            ctx.throw(401, error.message);
          } else {
            ctx.throw(403);
          }
          break;
        default:
          log.error(error.message);
          throw error;
      }
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
  // filter
  if (query.filter !== undefined) {
    try {
      query.filter = JSON.parse(query.filter);
    } catch (error) {
      throw new Error('Parameter filter:' + error.message);
    }
  }
}

/**
 * Assert that the gRPC method has a function
 *
 * @param {Object} service gRPC service client instance
 * @param {string} method Name of method
 */
function assertMethod(service, method) {
  assert(typeof service[method] === 'function', method);
  assert(service[method].hasOwnProperty('originalName'), method);
}

module.exports = (service) => ({
  search(method) {
    assertMethod(service, method);
    return async (ctx) => {
      try {
        convertQueryParameters(ctx.query);
      } catch (error) {
        ctx.throw(400, error.message);
      }
      ctx.body = await call(service, method, ctx.query, ctx);
    };
  },

  list(method) {
    assertMethod(service, method);
    return async (ctx) => ctx.body = await call(service, method, {}, ctx);
  },

  get(method) {
    assertMethod(service, method);
    return async (ctx, id) => ctx.body = await call(service, method, {id}, ctx);
  },

  save(method) {
    assertMethod(service, method);
    return async (ctx) => {
      ctx.status = 201;
      ctx.body = await call(service, method, ctx.request.body, ctx);
    };
  },

  update(method) {
    assertMethod(service, method);
    return async (ctx) => ctx.body = await call(service, method, ctx.request.body, ctx);
  },

  del(method) {
    assertMethod(service, method);
    return async (ctx, id) => {
      try {
        ctx.status = 204;
        ctx.body = await call(service, method, {id}, ctx);
      } catch (error) {
        ctx.throw(403, error.message, error);
      }
    };
  },
});
