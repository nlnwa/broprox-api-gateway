const express = require('express');
const router = new express.Router();
const controller = require('./controller');

router.get('/', (req, res) => res.send('api works!'));

try {
  /** Entities */
  router.get('/entities', controller.search('listCrawlEntities'));
  router.get('/entities/', controller.list('listCrawlEntities'));
  router.post('/entities/', controller.save('saveEntity'));
  router.get('/entities/:id', controller.get('listCrawlEntities'));
  router.put('/entities/:id', controller.update('saveEntity'));
  router.delete('/entities/:id', controller.delete('deleteEntity'));

  /** Browserconfig */
  router.get('/browserconfigs', controller.list('listBrowserConfigs'));
  router.post('/browserconfigs', controller.save('saveBrowserConfig'));
  router.get('/browserconfigs/:id', controller.get('listBrowserConfigs'));
  router.put('/browserconfigs/:id', controller.update('saveBrowserConfig'));
  router.delete('/browserconfigs/:id', controller.delete('deleteBrowserConfig'));

  /** Browserscripts */
  router.get('/browserscripts', controller.list('listBrowserScripts'));
  router.post('/browserscripts', controller.save('saveBrowserScript'));
  router.get('/browserscripts/:id', controller.get('listBrowserScripts'));
  router.put('/browserscripts/:id', controller.update('saveBrowserScript'));
  router.delete('/browserscripts/:id', controller.delete('deleteBrowserScript'));

  /** Crawljobs */
  router.get('/crawljobs', controller.list('listCrawlJobs'));
  router.post('/crawljobs', controller.save('saveCrawlJob'));
  router.get('/crawljobs/:id', controller.get('listCrawlJobs'));
  router.put('/crawljobs/:id', controller.update('saveCrawlJob'));
  router.delete('/crawljobs/:id', controller.delete('deleteCrawlJob'));

  /** Crawlconfig */
  router.get('/crawlconfigs', controller.list('listCrawlConfigs'));
  router.post('/crawlconfigs', controller.save('saveCrawlConfig'));
  router.get('/crawlconfigs/:id', controller.get('listCrawlConfigs'));
  router.put('/crawlconfigs/:id', controller.update('saveCrawlConfig'));
  router.delete('/crawlconfigs/:id', controller.delete('deleteCrawlConfig'));

  /** CrawlHostGroupconfig */
  router.get('/crawlhostgroupconfigs', controller.list('listCrawlHostGroupConfigs'));
  router.post('/crawlhostgroupconfigs', controller.save('saveCrawlHostGroupConfig'));
  router.get('/crawlhostgroupconfigs/:id', controller.get('listCrawlHostGroupConfigs'));
  router.put('/crawlhostgroupconfigs/:id', controller.update('saveCrawlHostGroupConfig'));
  router.delete('/crawlhostgroupconfigs/:id', controller.delete('deleteCrawlHostGroupConfig'));

  /** Schedule */
  router.get('/schedules', controller.list('listCrawlScheduleConfigs'));
  router.post('/schedules', controller.save('saveCrawlScheduleConfig'));
  router.get('/schedules/:id', controller.get('listCrawlScheduleConfigs'));
  router.put('/schedules/:id', controller.update('saveCrawlScheduleConfig'));
  router.delete('/schedules/:id', controller.delete('deleteCrawlScheduleConfig'));

  /** Politenessconfig */
  router.get('/politenessconfigs', controller.list('listPolitenessConfigs'));
  router.post('/politenessconfigs', controller.save('savePolitenessConfig'));
  router.get('/politenessconfigs/:id', controller.get('listPolitenessConfigs'));
  router.put('/politenessconfigs/:id', controller.update('savePolitenessConfig'));
  router.delete('/politenessconfigs/:id', controller.delete('deletePolitenessConfig'));

  /** Seeds */
  router.get('/seeds', controller.search('listSeeds'));
  router.get('/seeds/', controller.list('listSeeds'));
  router.post('/seeds/', controller.save('saveSeed'));
  router.get('/seeds/:id', controller.get('listSeeds'));
  router.put('/seeds/:id', controller.update('saveSeed'));
  router.delete('/seeds/:id', controller.delete('deleteSeed'));

  /** Logconfig */
  router.get('/logconfig', controller.list('getLogConfig'));
  router.post('/logconfig', controller.save('saveLogConfig'));

  /** Runcrawlrequest */
  router.get('/runcrawl', controller.search('runCrawl'));
} catch (error) {
  console.warn(error);
  process.exit(1);
}

module.exports = router;
