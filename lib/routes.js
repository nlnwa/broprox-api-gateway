const _ = require('koa-route');
const controller = require('./controller');

const prefix = '/api';
const routes = [];

routes.push(_.get(prefix, (ctx) => {
  ctx.status = 200;
  ctx.body = {message: 'api works!', status: 200};
}));

[
  ['seeds', 'Seed', 'Seeds'],
  ['entities', 'Entity', 'CrawlEntities'],
  ['browserconfigs', 'BrowserConfig', 'BrowserConfigs'],
  ['browserscripts', 'BrowserScript', 'BrowserScripts'],
  ['crawljobs', 'CrawlJob', 'CrawlJobs'],
  ['crawlconfigs', 'CrawlConfig', 'CrawlConfigs'],
  ['crawlhostgroupconfigs', 'CrawlHostGroupConfig', 'CrawlHostGroupConfigs'],
  ['schedules', 'CrawlScheduleConfig', 'CrawlScheduleConfigs'],
  ['politenessconfigs', 'PolitenessConfig', 'PolitenessConfigs'],
]
  .map((item) => ({
    path: prefix + '/' + item[0],
    singular: item[1],
    plural: item[2],
  }))
  .forEach((item) => {
    routes.push(_.get(item.path, controller.search(`list${item.plural}`)));
    routes.push(_.get(item.path + '/', controller.list(`list${item.plural}`)));
    routes.push(_.post(item.path + '/', controller.save(`save${item.singular}`)));
    routes.push(_.get(item.path + '/:id', controller.get(`list${item.plural}`)));
    routes.push(_.put(item.path + '/:id', controller.update(`save${item.singular}`)));
    routes.push(_.delete(item.path + '/:id', controller.delete(`delete${item.singular}`)));
  });

routes.push(_.get(prefix + '/logconfig', controller.list('getLogConfig')));
routes.push(_.post(prefix + '/logconfig', controller.save('saveLogConfig')));
routes.push(_.get(prefix + '/runcrawl', controller.search('runCrawl')));

module.exports = routes;
