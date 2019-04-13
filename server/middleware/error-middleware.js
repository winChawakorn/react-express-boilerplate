/**
 * Error handler middleware.
 * @module middleware/error
 */

import log from '../misc/logger'
import { send } from '../misc/response'
import { notFound } from '../misc/error'

/**
 * Set error handler to app.
 * @param {Object} app - Express' app instance.
 */
export default function (app) {
  // Catch request if not match in any route and mark as 404
  app.use((req, res, next) => notFound(next))

  // This middleware requires 4 parameters to be able to be identified as error handler.
  app.use((err, req, res, next) => {
    /* istanbul ignore next */
    const status = err.status || 500
    const { errobj } = err

    // There is an application error, save detailed log.
    if (status >= 500) {
      // If it is not simplified from previous middleware so it is some uncaught error.
      /* istanbul ignore if */
      if (!err.simplified) {
        err.message = `${err.message} [UNCAUGHT]` // eslint-disable-line no-param-reassign
        err.enclosedmessage = 'Internal error.' // eslint-disable-line no-param-reassign
      }

      log('error', '[SERVER ERROR]', {
        requestid: req.requestid,
        errmessage: err.message,
        errobj: errobj || err,
      })
    } else {
      log('warn', '[CLIENT ERROR]', {
        requestid: req.requestid,
        errmessage: err.message,
        errobj: errobj || err,
      })
    }
    res.status(status)
    send(
      {
        code: status,
        message: err.enclosedmessage,
      },
      req,
      res,
    )
    next()
  })
}
