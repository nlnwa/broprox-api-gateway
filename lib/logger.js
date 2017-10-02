const logger = 'veidemann-api-gateway';
const thread = '[main]';
const levels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4
};

const runLevel = process.env.LOG_LEVEL || levels.WARN;

/**
 * Export levels
 */
exports.levels = levels;

/**
 * Export logger methods trace, debug, info, warn and error.
 */
Object.keys(levels)
  .forEach((level) => {
    module.exports[level.toLowerCase()] = log(level, ...args);
  });

function log(level, ...messages) {
  if (runLevel > levels[level]) return;

  const time = new Date().toISOString();

  const args = [time, thread, level, logger, '-', ...messages];

  switch(logLevel) {
  case levels.TRACE:
  case levels.DEBUG:
    console.log(...args);
    break;
  case levels.INFO:
    console.info(...args);
    break;
  case levels.WARN:
    console.warn(...args);
    break;
  case levels.ERROR:
    console.error(...args);
    break;
  default:
    log(levels.INFO, ...messages);
    break;
  }
}
