const client = require('../service/controller.js');

exports.listCrawlEntities = (req, res) => {
  client.listCrawlEntities({}, function(err, response) {
    if (err) {
      console.log('Entities: ' + err);
      res.status(500);
    } else {
      res.status(200).json(response);
    }
  });
};

exports.getCrawlEntities = (req, res) => {
  client.listCrawlEntities({id: req.params.id}, function(err, response) {
    if (err) {
      console.log('Entities: ' + err);
      res.status(500);
    } else {
      res.status(200).json(response);
    }
  });
};

exports.saveEntity = (req, res) => {
  console.log(req.body);
  client.saveEntity(req.body, function(err, response) {
    if (err) {
      console.log('Entities: ' + err);
      res.status(500);
    } else {
      res.status(201).json(response);
    }
  });
};

exports.updateCrawlEntities = (req, res) => {
  client.saveEntity(req.body, function(err, response) {
    if (err) {
      console.log('Entities: ' + err);
      res.status(500);
    } else {
      console.log('updateCrawlEntities NOT IMPLEMENTED');
      res.sendStatus(500);
    }
  });
};

exports.deleteCrawlEntities = (req, res) => {
  client.deleteEntity({id: req.params.id}, function(err, response) {
    if (err) {
      console.log('Entities: ' + err);
      res.status(405).json(err);
    } else {
      res.status(200).json(req.params.id);
    }
  });
};

exports.searchCrawlEntities = (req, res) => {
  client.listCrawlEntities(
    {name_prefix: req.params.name},
    function(err, response) {
      if (err) {
        console.log('Entities: ' + err);
        res.status(500);
      } else {
        res.status(200).json(response);
      }
    });
};
