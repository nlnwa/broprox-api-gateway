const debug = require('debug')('veidemann-api-gateway:bearer');

module.exports = (options) => {
  options = options || {};

  const queryKey = options.queryKey || 'access_token';
  const bodyKey = options.bodyKey || 'access_token';
  const headerKey = options.headerKey || 'Bearer';
  const stateKey = options.stateKey || 'token';

  return (ctx, next) => {
    let token;
    let err;

    if (ctx.query && ctx.query[queryKey]) {
      token = ctx.query[queryKey];
    }

    if (ctx.body && ctx.body[bodyKey]) {
      if (token) {
        err = true;
      }
      token = ctx.body[bodyKey];
    }

    if (ctx.get('authorization')) {
      const authorization = ctx.get('authorization');
      if (authorization.startsWith(headerKey)) {
        const parts = authorization.split(' ');
        if (parts.length === 2) {
          if (token) {
            err = true;
          }
          token = parts[1];
        }
      }
    }

    debug('Token: %O', token);

    // RFC6750 states the access_token MUST NOT be provided
    // in more than one place in a single request.
    ctx.assert(!err, 400, 'token_invalid', {
      message: 'access_token MUST NOT be provided in more than one place',
    });

    ctx.state[stateKey] = token;

    return next();
  };
};

