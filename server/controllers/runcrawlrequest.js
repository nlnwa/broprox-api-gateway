const client = require('../service/controller.js');

exports.runcrawlRequest = (req, res) => {
  console.log(req.body);
  client.runCrawl(req.body, function(err, response) {
    if (err) {
      console.log('RunCrawl ' + err);
      res.status(500);
    } else {
      console.log(response);
      res.status(200).json(response);
    }
  });
};
