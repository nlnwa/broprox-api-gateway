// The MIT License (MIT)
//
// Copyright (c) 2015 C. T. Lin
// Copyright (c) 2017 Nasjonalbiblioteket
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
//   The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
//   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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

    // token provided as a query parameter
    if (ctx.query && ctx.query[queryKey]) {
      token = ctx.query[queryKey];
    }

    // token provided in the body
    if (ctx.body && ctx.body[bodyKey]) {
      if (token) {
        err = true;
      }
      token = ctx.body[bodyKey];
    }

    // token provided as a HTTP header
    const authorization = ctx.get('authorization');
    if (authorization && authorization.startsWith(headerKey)) {
      if (token) {
        err = true;
      }
      token = authorization;
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
}
;

