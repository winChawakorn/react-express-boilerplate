/**
 * Response handler
 * @module misc/response
 */

import log from '../misc/logger'
import moment from 'moment'
import { internalError } from './error'

export function send(data, req, res) {
  res.send(data)
}

export function sendPDFFile(filePath, req, res, next) {
  res.download(
    filePath,
    `${moment()
      .utcOffset(7)
      .format('YYYYMMDD_HHmmss')}.pdf`,
    err => {
      if (err) internalError('misc/reponse:sendPDFFile()', 'Send file failed.', next)
      else log('verbose', '[END] PDF File sent.', { requestid: req.requestid })
    }
  )
}

export const statusOk = {
  status: 'OK',
}
