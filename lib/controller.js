const client = require('./service');

function Controller(singular, plural) {
  this.singular = singular;
  this.plural = plural;
}

Controller.prototype.list = function(req, res)  {
  client[`list${this.plural}`]({}, listHandler.bind(res));
}

Controller.prototype.get = function(req, res) {
  client[`list${this.plural}`]({id: req.params.id}, listHandler.bind(res));
}

Controller.prototype.save = function(req, res) {
 client[`save${this.singular}`](req.body, saveHandler.bind(res));
}

Controller.prototype.update = function(req, res) {
 client[`save${this.singular}`](req.body, updateHandler.bind(res));
}

Controller.prototype.delete = function(req, res) {
 client[`delete${this.singular}`]({id: req.params.id}, deleteHandler.bind(res));
}

function listHandler(err, response) {
  if (err) {
    this.status(500);
  } else {
    this.status(200).json(response);
  }
}

function updateHandler(err, response) {
  if (err) {
    this.status(500);
  } else {
    this.status(200).json(response);
  }
}


function saveHandler(err, response) {
  if (err) {
    this.status(500);
  } else {
    this.status(201).json(response);
  }
}

function deleteHandler(err) {
  if (err) {
    this.status(405).json(err);
  } else {
    this.status(200);
  }
}

module.exports = Controller;
