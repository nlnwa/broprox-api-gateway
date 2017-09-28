const client = require('./service');
const assert = require('assert');

const Controller = function() {};

Controller.prototype.assert = function(method) {
  assert(typeof client[method] === 'function', method);
  assert(client[method].hasOwnProperty('originalName'));
}

Controller.prototype.search = function(method) {
  this.assert(method);

  return function(req, res) {
    client[method](req.query, (error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(response);
      }
    });
  };
};

Controller.prototype.list = function(method) {
  this.assert(method);

  return function(req, res) {
    client[method]({}, (error, response) => {
      if (error) {
        res.status(500);
      } else {
        res.status(200).json(response);
      }
    });
  };
};

Controller.prototype.get = function(method) {
  this.assert(method);

  return function(req, res) {
    client[method]({id: req.params.id}, (error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(response);
      }
    });
  };
};

Controller.prototype.save = function(method) {
  this.assert(method);

  return function(req, res) {
    client[method](req.body, (error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(201).json(response);
      }
    });
  };
};

Controller.prototype.update = function(method) {
  this.assert(method);

  return function(req, res) {
    client[method](req.body, (error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(response);
      }
    });
  };
};

Controller.prototype.delete = function(method) {
  this.assert(method);

  return function(req, res) {
    client[method]({id: req.params.id}, (error, response) => {
      if (error) {
        res.status(405).json(error);
      } else {
        res.status(200).json(response);
      }
    });
  };
};

module.exports = new Controller();
