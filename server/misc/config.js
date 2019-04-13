/**
 * Configuration reader
 * (Do not read `config.json` file directly in other module, use this module instead.)
 * @module misc/config
 */
/* istanbul ignore next */
const nodeEnv = process.env.NODE_ENV || 'development'
// *** load environment variables *** //
require('dotenv').config({ path: `.env.${nodeEnv}` })

const requireEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`)
  }
  return process.env[name]
}

const { env } = process
const config = {
  environment: nodeEnv,
  server: {
    port: env.PORT || 4000,
  },
  accesstoken: {
    secret: env.TOKEN_SECRET || 'secret',
    expiretime: Number(env.TOKEN_EXPIRETIME) || 3600,
  },
  defaultTimeZone: env.DEFAULT_TIMEZONE || '+0700',
  loglevel: env.LOGLEVEL || 'verbose',
  maxfilesize: env.MAX_FILE_SIZE || 1000000, // 1MB
}

/**
 * Configuration read from file config.json
 * @property {string} environment - normalized NODE_ENV
 * @property {object} server - Server configuration
 * @property {number} server.port - serving port
 * @property {string} server.maxBodySize - Max size of request body in human readable formate
 * @property {object} accesstoken - Access token configs
 * @property {string} accesstoken.secret - Secret string used to sign a token.
 * @property {number} accesstoken.expiretime - Token expire time in second.
 * @property {string} defaultTimeZone - Default timezone for parsing to database.
 * @property {object} pagination - Pagination feature configs
 * @property {string} pagination.defaultlimit - Default length for pagination
 * @property {('error'|'warn'|'info'|'verbose'|'debug'|'silly')} loglevel - Log level to be put in file
 * @property {number} maxfilesize - Max file size to upload
 */
module.exports = config
