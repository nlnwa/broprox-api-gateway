const client = require('./service');
const assert = require('assert');

function assertMethod(method) {
  assert(typeof client[method] === 'function', method);
  assert(client[method].hasOwnProperty('originalName'), method);
}

function callService(method, param) {
  return new Promise((resolve, reject) => {
    param = Object.assign({}, param);
    client[method](param, (error, response) => error ? reject(error) : resolve(response));
  }).then((response) => {
    console.log('method:  ', method);
    console.log('request: ', param);
    console.log('response:', response);
    return response;
  });
}

function search(method) {
  assertMethod(method);
  return async (ctx) => {
    try {
      ctx.body = await callService(method, ctx.query);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  };
}

function list(method) {
  assertMethod(method);
  return async (ctx) => {
    ctx.body = await callService(method, {});
    ctx.status = 200;
  };
}

function get(method) {
  assertMethod(method);
  return async (ctx, id) => {
    ctx.body = await callService(method, {id});
    ctx.status = 200;
  };
}

function save(method) {
  assertMethod(method);
  return async (ctx) => {
    ctx.body = await callService(method, ctx.request.body);
    ctx.status = 201;
  };
}

function update(method) {
  assertMethod(method);
  return async (ctx) => {
    ctx.body = await callService(method, ctx.request.body);
    ctx.status = 200;
  };
}

function del(method) {
  assertMethod(method);
  return async (ctx, id) => {
    try {
      ctx.body = await callService(method, {id});
      ctx.status = 204;
    } catch (error) {
      ctx.throw(403, error.message, error);
    }
  };
}

module.exports = {
  search,
  list,
  get,
  save,
  update,
  delete: del,
};
