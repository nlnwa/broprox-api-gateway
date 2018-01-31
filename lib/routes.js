const _ = require('koa-route');

// services
const controller = require('./service/controller');
const reporter = require('./service/report');

// Create a controller for each service
const ctl = require('./controller')(controller);
const report = require('./controller')(reporter);

module.exports = [
  // Routes for the controller service (controller.proto)
  ...[
    ['entities', 'Entity', 'CrawlEntities'],
    ['seeds', 'Seed', 'Seeds'],
    ['browserconfigs', 'BrowserConfig', 'BrowserConfigs'],
    ['browserscripts', 'BrowserScript', 'BrowserScripts'],
    ['crawljobs', 'CrawlJob', 'CrawlJobs'],
    ['crawlconfigs', 'CrawlConfig', 'CrawlConfigs'],
    ['crawlhostgroupconfigs', 'CrawlHostGroupConfig', 'CrawlHostGroupConfigs'],
    ['schedules', 'CrawlScheduleConfig', 'CrawlScheduleConfigs'],
    ['politenessconfigs', 'PolitenessConfig', 'PolitenessConfigs'],
    ['rolemappings', 'RoleMapping', 'RoleMappings'],
  ]
    .map((item) =>
      ({
        path: '/' + item[0],
        singular: item[1],
        plural: item[2],
      }))
    .map((item) =>
      [
        _.get(item.path, ctl.search(`list${item.plural}`)),
        _.get(item.path + '/', ctl.list(`list${item.plural}`)),
        _.post(item.path + '/', ctl.save(`save${item.singular}`)),
        _.get(item.path + '/:id', ctl.get(`list${item.plural}`)),
        _.put(item.path + '/:id', ctl.update(`save${item.singular}`)),
        _.del(item.path + '/:id', ctl.del(`delete${item.singular}`)),
      ])
    .reduce((acc, curr) => acc.concat(curr), []),
  ...[
    _.get('/logconfig', ctl.list('getLogConfig')),
    _.post('/logconfig', ctl.save('saveLogConfig')),
  ],
  ...[
    _.get('/runcrawl', ctl.search('runCrawl')),
    _.get('/abortcrawl', ctl.search('abortCrawl')),
  ],
  _.get('/roles', ctl.list('getRolesForActiveUser')),

  // Routes for the report service (report.proto)
  _.get('/crawllogs', report.search('listCrawlLogs')),
  _.get('/pagelogs', report.search('listPageLogs')),
  _.get('/screenshots', report.search('listScreenshots')),

  _.get('/healthz', (ctx) => ctx.body = {message: 'API UP!'}),
];
