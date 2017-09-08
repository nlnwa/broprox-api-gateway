const express = require('express');
const router = new express.Router();

const seeds = require('../controllers/seeds');
const entities = require('../controllers/entities');
const browserscripts = require('../controllers/browserscript');
const browserconfigs = require('../controllers/browserconfig');
const crawlconfigs = require('../controllers/crawlconfig');
const crawljobs = require('../controllers/crawljob');
const schedule = require('../controllers/schedule');
const politenessconfig = require('../controllers/politenessconfig');
const logconfig = require('../controllers/logconfig');
const runcrawlrequest = require('../controllers/runcrawlrequest');
// const users = require('../controllers/users');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works!');
});

/*
//Client side check if users is authenticated
router.get('/user_data', function (req, res) {
  if (req.user === undefined) {
    // The users is not logged in
    res.json({});
  } else {
    res.json({
      name: req.user.displayName,
      username: req.user.sAMAccountName,
      email: req.user.mail,
    });
  }
});

router.get('/test', accessLevel('admin', 'kurator', 'potet'), (req, res) => {
  res.send("ok");
});
*/

/** Entities */
router.get('/searchentities/name=:name', entities.searchCrawlEntities);
router.get('/entities', entities.listCrawlEntities);
router.post('/entities', entities.saveEntity);
router.get('/entities/:id', entities.getCrawlEntities);
router.put('/entities/:id', entities.updateCrawlEntities);
router.delete('/entities/:id', entities.deleteCrawlEntities);

/** Users
router.get('/users', users.listUser);
router.post('/users', users.postUser);
router.get('/users/:id', users.getUser);
router.put('/users/:id', users.putUser);
router.delete('/users/:id', users.deleteUser);
*/

/** Browserconfig */
router.get('/browserconfig', browserconfigs.listBrowserConfig);
router.post('/browserconfig', browserconfigs.saveBrowserConfig);
router.get('/browserconfig/:id', browserconfigs.getBrowserConfig);
router.put('/browserconfig/:id', browserconfigs.updateBrowserConfig);
router.delete('/browserconfig/:id', browserconfigs.deleteBrowserConfig);

/** Browserscripts */
router.get('/browserscript', browserscripts.listBrowserScripts);
router.post('/browserscript', browserscripts.saveBrowserScript);
router.get('/browserscript/:id', browserscripts.getBrowserScript);
router.put('/browserscript/:id', browserscripts.updateBrowserScript);
router.delete('/browserscript/:id', browserscripts.deleteBrowserScript);

/** Crawljobs */
router.get('/crawljob', crawljobs.listCrawlJobs);
router.post('/crawljob', crawljobs.saveCrawlJob);
router.get('/crawljob/:id', crawljobs.getCrawlJob);
router.put('/crawljob/:id', crawljobs.updateCrawlJob);
router.delete('/crawljob/:id', crawljobs.deleteCrawlJob);

/** Crawlconfig */
router.get('/crawlconfig', crawlconfigs.listCrawlConfigs);
router.post('/crawlconfig', crawlconfigs.saveCrawlConfig);
router.get('/crawlconfig/:id', crawlconfigs.getCrawlConfig);
router.put('/crawlconfig/:id', crawlconfigs.updateCrawlConfig);
router.delete('/crawlconfig/:id', crawlconfigs.deleteCrawlConfig);

/** Schedule */
router.get('/schedule', schedule.listSchedule);
router.post('/schedule', schedule.saveSchedule);
router.get('/schedule/:id', schedule.getSchedule);
router.put('/schedule/:id', schedule.updateSchedule);
router.delete('/schedule/:id', schedule.deleteSchedule);

/** Politenessconfig */
router.get('/politenessconfig', politenessconfig.listPolitenessConfigs);
router.post('/politenessconfig', politenessconfig.savePolitenessConfig);
router.get('/politenessconfig/:id', politenessconfig.getPolitenessConfig);
router.put('/politenessconfig/:id', politenessconfig.updatePolitenessConfig);
router.delete('/politenessconfig/:id', politenessconfig.deletePolitenessConfig);
router.get('/robotspolicy', politenessconfig.getrobotsconfig);

/** Seeds */
router.get('/seedsearch/name=:name', seeds.seedSearch);
router.get('/seeds', seeds.listSeeds);
router.post('/seeds', seeds.saveSeed);
router.get('/seeds/:id', seeds.getSeed);
router.put('/seeds/:id', seeds.updateSeed);
router.delete('/seeds/:id', seeds.deleteSeed);
router.get('/seedsofentity/entityid=:entityid', seeds.getSeedsOfEntity);

/** Logconfig */
router.get('/logconfig', logconfig.listLogConfig);
router.put('/logconfig', logconfig.updateLogConfig);
router.delete('/logconfig/:id', logconfig.deleteLogConfig);

/** Runcrawlrequest */
router.get('/runcrawlrequest', runcrawlrequest.runcrawlRequest);
router.post('/runcrawlrequest', runcrawlrequest.runcrawlRequest);

module.exports = router;
