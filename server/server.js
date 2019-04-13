import http from 'http'
import bluebird from 'bluebird'
import app from './app'
import config from './misc/config'
import log from './misc/logger'

global.Promise = bluebird

const debug = require('debug')('api:server')

const port = normalizePort(config.server.port || '4000')
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const parsedPort = parseInt(val, 10)
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(parsedPort)) {
    return val
  }
  if (parsedPort >= 0) {
    return parsedPort
  }
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  // eslint-disable-next-line no-use-before-define
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      log('error', `[APP] ${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      log('error', `[APP] ${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  // eslint-disable-next-line no-use-before-define
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
  log('info', `[APP] Listening on ${bind}`)
}
