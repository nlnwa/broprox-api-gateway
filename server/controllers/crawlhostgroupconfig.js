const client = require('../service/controller.js');


exports.listCrawlHostGroupConfigs = (req, res) => {
  client.listCrawlHostGroupConfigs({}, function(err, response) {
    if (err) {
      console.log('CrawlHostGroupconfig: ' + err);
      res.status(500);
    } else {
      console.log('RES' +res)
      res.status(200).json(response);
    }
  });
};

exports.getCrawlHostGroupConfig = (req, res) => {
  client.listCrawlHostGroupConfigs({
    id: req.params.id}, function(err, response) {
    if (err) {
      console.log('Crawlhostgroupconfig: ' + err);
      res.status(500);
    } else {
      res.status(200).json(response);
    }
  });
};

exports.saveCrawlHostGroupConfig = (req, res) => {
  console.log(req.body);
  client.saveCrawlHostGroupConfig(req.body, function(err, response) {
    if (err) {
      console.log('Crawlhostgroupconfig: ' + err);
      res.status(500);
    } else {
      res.status(200).json(response);
    }
  });
};

exports.updateCrawlHostGroupConfig = (req, res) => {
  client.saveCrawlHostGroupConfig(req.body, function(err, response) {
    if (err) {
      console.log('Crawlhostgroupconfig: ' + err);
      res.status(500);
    } else {
      res.status(200).json(response);
    }
  });
};

exports.deleteCrawlHostGroupConfig = (req, res) => {
  console.log(req.params.id);
  client.deleteCrawlHostGroupConfig({id: req.params.id},
    function(err, response) {
    if (err) {
      console.log('Crawlhostgroupconfig ' + err);
      res.status(405).json(err);
    } else {
      res.status(200).json(req.params.id);
    }
  });
};
