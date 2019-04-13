/**
 * Logging module
 * (Do not ever use `consile.log`, use this module to create an instance and log with it.)
 * @module misc/log
 */

import winston from 'winston'
import DailyFile from 'winston-daily-rotate-file'
import moment from 'moment'
import config from './config'

/* istanbul ignore next */
const _loglevel = config.loglevel || 'silly'

// -> Daily file log transport.
const transports = []

// -> If in development environment, will add console log transport as well.
/* istanbul ignore if */
if (config.environment === 'development') {
  transports.push(new winston.transports.Console({
    level: 'silly',
    prettyPrint: true,
    timestamp() {
      return `${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}`
    },
    formatter(opt) {
      return winston.config.colorize(opt.level, `[${opt.timestamp()}][${opt.level.toUpperCase()}] `) +
        (opt.message ? opt.message : '') +
        (opt.meta && Object.keys(opt.meta).length ? `\n\t${JSON.stringify(opt.meta)}` : '')
    },
  }))
}

// Put log to file YYYY-MM-DD.xxxxx.test.log if NODE_ENV set to 'test'
/* istanbul ignore else */
if (config.environment === 'test') {
  transports.push(new DailyFile({
    filename: `./log/test.log`,
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: _loglevel,
  }))
}

const logger = new winston.Logger({ transports, exitOnError: false })

const log = (level, message, object) => {
  logger.log(level, message, object)
}

export default log
