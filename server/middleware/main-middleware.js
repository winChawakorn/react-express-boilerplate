/**
 * Main middleware.
 * @module middleware/main
 */

import bodyParser from 'body-parser'
import randomstring from 'randomstring'
import helmet from 'helmet'
import url from 'url'
import cors from 'cors'
import compression from 'compression'

import log from '../misc/logger'
import config from '../misc/config'
import { UnsupportContentType } from '../misc/error'

/**
 * Set middlewares to app instance.
 * @param app - Express' app instance.
 */
export default function (app) {
  app.use(helmet())
  app.use(cors())
  app.use(compression())

  // -> Request log
  app.use((req, res, next) => {
    req.requestid = randomstring.generate(10)
    const [pathname, querystring] = req.originalUrl.split('?')

    log('info', '[REACH]', {
      requestid: req.requestid,
      client: {
        forwarded: req.header('x-forwarded-for'),
        remote: req.connection.remoteAddress,
      },
      method: req.method,
      url: url.format({
        protocol: req.header('x-forwarded-proto') || req.protocol,
        host: req.header('x-forwarded-host') || req.get('Host'),
        pathname,
        search: querystring,
      }),
      httpversion: req.httpVersion,
      agent: req.header('user-agent'),
      referer: req.header('Referer') || '',
      'content-length': req.header('content-length'),
      'content-type': req.header('content-type'),
    })

    const contentType = req.header('content-type')

    if (contentType && !/^(application\/json|multipart\/form-data)/.test(contentType)) {
      UnsupportContentType(next)
    } else {
      next()
    }
  })

  app.use(bodyParser.json({ limit: config.server.maxBodySize }))
  app.use(bodyParser.urlencoded({ extended: false, limit: config.server.maxBodySize }))

  // -> Payload log
  app.use((req, res, next) => {
    const _postBody = Object.assign({}, req.body)
    if (_postBody.password) _postBody.password = '*'

    log('info', '[PAYLOAD]', {
      requestid: req.requestid,
      query: req.query,
      body: _postBody,
    })
    next()
  })
}
