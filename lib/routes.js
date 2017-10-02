const _ = require('koa-route');
const ctl = require('./controller');

const prefix = '/api';

module.exports = [
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
  ]
    .map((item) => ({
      path: prefix + '/' + item[0],
      singular: item[1],
      plural: item[2]
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
    _.get(prefix + '/logconfig', ctl.list('getLogConfig')),
    _.post(prefix + '/logconfig', ctl.save('saveLogConfig')),
  ],
  _.get(prefix + '/runcrawl', ctl.search('runCrawl')),
  _.get(prefix, (ctx) => {ctx.body = {message: 'api works!'};})
];
