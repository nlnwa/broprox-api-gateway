const express = require('express');
const router = new express.Router();

const seeds = require('../controllers/seeds');
const entities = require('../controllers/entities');
const browserscripts = require('../controllers/browserscript');
const browserconfigs = require('../controllers/browserconfig');
const crawlconfigs = require('../controllers/crawlconfig');
const crawlhostgroupconfig = require('../controllers/crawlhostgroupconfig');
const crawljobs = require('../controllers/crawljob');
const schedule = require('../controllers/schedule');
const politenessconfig = require('../controllers/politenessconfig');
const logconfig = require('../controllers/logconfig');
const runcrawlrequest = require('../controllers/runcrawlrequest');

const handler = require('../controllers/handlers');

router.get('/', (req, res) => res.send('api works!'));

/** Entities */
const entityHandler = new handler.Handler('Entity', 'Entities');

router.get('/entities/search', entities.searchCrawlEntities);
router.get('/entities', entityHandler.list());
router.post('/entities', entities.saveCrawlEntity);
router.get('/entities/:id', entities.getCrawlEntities);
router.put('/entities/:id', entities.updateCrawlEntity);
router.delete('/entities/:id', entities.deleteCrawlEntity);

/** Browserconfig */
router.get('/browserconfigs', browserconfigs.listBrowserConfigs);
router.post('/browserconfigs', browserconfigs.saveBrowserConfig);
router.get('/browserconfigs/:id', browserconfigs.getBrowserConfig);
router.put('/browserconfigs/:id', browserconfigs.updateBrowserConfig);
router.delete('/browserconfigs/:id', browserconfigs.deleteBrowserConfig);

/** Browserscripts */
router.get('/browserscripts', browserscripts.listBrowserScripts);
router.post('/browserscripts', browserscripts.saveBrowserScript);
router.get('/browserscripts/:id', browserscripts.getBrowserScript);
router.put('/browserscripts/:id', browserscripts.updateBrowserScript);
router.delete('/browserscripts/:id', browserscripts.deleteBrowserScript);

/** Crawljobs */
router.get('/crawljobs', crawljobs.listCrawlJobs);
router.post('/crawljobs', crawljobs.saveCrawlJob);
router.get('/crawljobs/:id', crawljobs.getCrawlJob);
router.put('/crawljobs/:id', crawljobs.updateCrawlJob);
router.delete('/crawljobs/:id', crawljobs.deleteCrawlJob);

/** Crawlconfig */
router.get('/crawlconfigs', crawlconfigs.listCrawlConfigs);
router.post('/crawlconfigs', crawlconfigs.saveCrawlConfig);
router.get('/crawlconfigs/:id', crawlconfigs.getCrawlConfig);
router.put('/crawlconfigs/:id', crawlconfigs.updateCrawlConfig);
router.delete('/crawlconfigs/:id', crawlconfigs.deleteCrawlConfig);

/** CrawlHostGroupconfig */
router.get(
  '/crawlhostgroupconfigs', crawlhostgroupconfig.listCrawlHostGroupConfigs);
router.post(
  '/crawlhostgroupconfigs', crawlhostgroupconfig.saveCrawlHostGroupConfig);
router.get(
  '/crawlhostgroupconfigs/:id', crawlhostgroupconfig.getCrawlHostGroupConfig);
router.put(
  '/crawlhostgroupconfigs/:id', crawlhostgroupconfig.updateCrawlHostGroupConfig);
router.delete(
  '/crawlhostgroupconfigs/:id', crawlhostgroupconfig.deleteCrawlHostGroupConfig);

/** Schedule */
router.get('/schedules', schedule.listSchedule);
router.post('/schedules', schedule.saveSchedule);
router.get('/schedules/:id', schedule.getSchedule);
router.put('/schedules/:id', schedule.updateSchedule);
router.delete('/schedules/:id', schedule.deleteSchedule);

/** Politenessconfig */
router.get('/politenessconfigs', politenessconfig.listPolitenessConfigs);
router.post('/politenessconfigs', politenessconfig.savePolitenessConfig);
router.get('/politenessconfigs/:id', politenessconfig.getPolitenessConfig);
router.put('/politenessconfigs/:id', politenessconfig.updatePolitenessConfig);
router.delete('/politenessconfigs/:id', politenessconfig.deletePolitenessConfig);
router.get('/politenessconfigs/robotspolicy', politenessconfig.getrobotsconfig);

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
router.get('/runcrawl', runcrawlrequest.runcrawlRequest);
router.post('/runcrawl', runcrawlrequest.runcrawlRequest);

module.exports = router;
