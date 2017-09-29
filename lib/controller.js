const client = require('./service');
const assert = require('assert');

const Controller = function() {};

Controller.prototype.search = function(method) {
  assertMethod(method);
  return (req, res) => handler(req, res, method, req.query, 200, 500);
};

Controller.prototype.list = function(method) {
  assertMethod(method);
  return (req, res) => handler(req, res, method, {}, 200, 500);
};

Controller.prototype.get = function(method) {
  assertMethod(method);
  return (req, res) => handler(req, res, method, {id: req.params.id}, 200, 500);
};

Controller.prototype.save = function(method) {
  assertMethod(method);
  return (req, res) => handler(req, res, method, req.body, 201, 500);
};

Controller.prototype.update = function(method) {
  assertMethod(method);
  return (req, res) => handler(req, res, method, req.body, 200, 500);
};

Controller.prototype.delete = function(method) {
  assertMethod(method);
  return (req, res) => handler(req, res, method, {id: req.params.id}, 200, 403);
};

function assertMethod(method) {
  assert(typeof client[method] === 'function', method);
  assert(client[method].hasOwnProperty('originalName'), method);
}

function handler(req, res, method, param, okStatus, errorStatus) {
  try {
    client[method](param, (error, response) => {
      if (error) {
        res.status(errorStatus).json(error.message);
      } else {
        res.status(okStatus).json(response);
      }
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = new Controller();
