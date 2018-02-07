const grpc = require('grpc');
const assert = require('assert');
const debug = require('debug')('veidemann-api-gateway:controller');
const uuidv4 = require('uuid/v4');

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
      const status = httpStatusFromCode(error.code);
      ctx.throw(status, error.message);
    });
}

/**
 * httpStatusFromCode converts gRPC error code into corresponding HTTP response status code
 *
 * @see https://github.com/grpc/grpc-go/blob/master/codes/codes.go
 * @see https://github.com/grpc-ecosystem/grpc-gateway/blob/master/runtime/errors.go
 * @see https://github.com/grpc/grpc/blob/master/doc/http-grpc-status-mapping.md
 *
 * @param {number} code gRPC error code
 * @return {number} code HTTP status code
 */
function httpStatusFromCode(code) {
  switch (code) {
    case grpc.status.CANCELLED:
    case grpc.status.DEADLINE_EXCEEDED:
      return 408;
    case grpc.status.UNKNOWN:
    case grpc.status.INTERNAL:
    case grpc.status.DATA_LOSS:
      return 500;
    case grpc.status.INVALID_ARGUMENT:
    case grpc.status.OUT_OF_RANGE:
      return 400;
    case grpc.status.NOT_FOUND:
      return 404;
    case grpc.status.ALREADY_EXISTS:
      return 409;
    case grpc.status.PERMISSION_DENIED:
    case grpc.status.RESOURCE_EXHAUSTED:
      return 403;
    case grpc.status.UNAUTHENTICATED:
      return 401;
    case grpc.status.FAILED_PRECONDITION:
      return 412;
    case grpc.status.ABORTED:
      return 409;
    case grpc.status.UNIMPLEMENTED:
      return 501;
    case grpc.status.UNAVAILABLE:
      return 503;
    default:
      return 500;
  }
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
      ctx.status = 204;
      ctx.body = await call(service, method, {id}, ctx);
    };
  },
});
