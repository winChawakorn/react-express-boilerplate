/**
 * Error-handler function module.
 * @module misc/error
 */

/**
 * "HTTP Method error" error throwing function
 * @param {callback} [next] - Express' next middleware method.
 * @throws {Error} Will throw error instead of calling next(err) if next is not provided.
 */
export function HTTPmethodError(next) {
  const err = new Error(errorMessage.httpmethod)
  err.status = 405
  err.name = 'HTTPmethodError'
  err.enclosedmessage = errorMessage.httpmethod

  /* istanbul ignore else */
  if (typeof next === 'function') next(err)
  else throw err
}

export function UnsupportContentType(next) {
  const err = new Error(errorMessage.unsupportcontenttype)
  err.status = 415
  err.name = 'UnsupportContentType'
  err.enclosedmessage = errorMessage.unsupportcontenttype

  /* istanbul ignore else */
  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * General not found error.
 * @param {callback} [next] - Express' next middleware method.
 * @throws {Error} Will throw error instead of calling next(err) if next is not provided.
 */
export function notFound(next) {
  const err = new Error(errorMessage.notfound)
  err.status = 404
  err.name = 'notFound'
  err.enclosedmessage = errorMessage.notfound

  /* istanbul ignore next */
  if (typeof next === 'function') next(err)
  else throw err
}

export function notOwner(next) {
  const err = new Error(errorMessage.notowner)
  err.status = 403
  err.name = 'notOwner'
  err.enclosedmessage = errorMessage.notowner

  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * Request data validation error
 * @param {string} [message] - Error message
 * @param {callback} [next] - Express' next middleware method.
 * @param {object} [meta] - Metadata object
 * @throws {Error} Will throw error instead of calling next(err) if next is not provided.
 */
export function validationError(message = 'Validation failed.', next, meta) {
  const err = new Error(message)
  err.status = 400
  err.name = 'validationError'
  err.enclosedmessage = message
  if (meta) {
    err.errobj = meta
  }

  /* istanbul ignore else */
  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * Application's internal error
 * @param {string} [unit] - Error function
 * @param {string} [message] - Error message
 * @param {callback} [next] - Express' next middleware method.
 * @throws {Error} Will throw error instead of calling next(err) if next is not provided.
 */
export function internalError(unit, message, next) {
  const err = new Error(`${unit}: ${message}`)
  err.status = 500
  err.name = 'internalError'
  err.enclosedmessage = errorMessage.internal
  err.simplified = true

  /* istanbul ignore else */
  if (typeof next === 'function') next(err)
  else throw err
}

export function externalError(message, payload, next) {
  const err = new Error(message)
  err.status = 500
  err.name = 'externalError'
  err.enclosedmessage = errorMessage.external
  err.errobj = payload
  err.simplified = true

  /* istanbul ignore else */
  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * Validation error message formatter
 * @return formatted message
 */
export function validationErrorFormatter({ msg, param }) {
  return `'${param}' ${msg}`
}

/**
 * User is not found or username/password is invalid.
 * @throws {Error} Will always throw error since this function must be used within logic function
 *                 not the express' router, hence not using next() hook.
 */
export function userCombinationInvalid() {
  const err = new Error(errorMessage.usercomination)
  err.status = 401
  err.name = 'userCombinationInvalid'
  err.enclosedmessage = errorMessage.usercomination
  throw err
}

/**
 *
 * @param {callback} [next] - Express' next middleware method.
 * @throws {Error} Will throw error instead of calling next(err) if next is not provided.
 */
export function userForbidden(next) {
  const err = new Error(errorMessage.userforbidden)
  err.status = 403
  err.name = 'userForbidden'
  err.enclosedmessage = errorMessage.userforbidden

  /* istanbul ignore else */
  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * JSON web token error handler.
 * @param {Error} err - Instance of error thrown by library.
 * @param {callback} [next] - Express' next middleware method.
 * @throws {Error} Will throw error instead of calling next(err) if next is not provided.
 */
export function JWTError(err = {}, next) {
  const simplifiedErr = new Error(err.message)
  switch (err.name) {
    case 'TokenExpiredError':
      simplifiedErr.enclosedmessage = errorMessage.tokenexpired
      break
    default:
      simplifiedErr.enclosedmessage = errorMessage.tokeninvalid
      break
  }
  simplifiedErr.status = 401
  simplifiedErr.name = err.name

  /* istanbul ignore else */
  if (typeof next === 'function') next(simplifiedErr)
  else throw simplifiedErr
}

/**
 * General database error.
 * @param dbErr {Error} - Instance of error thrown by library
 * @param {callback} [next] - Express' next middleware method.
 * @throws {Error} Will always throw error since this function must be used within logic function
 *                 not the express' router, hence not using next() hook.
 */
export function databaseError(dbErr, next) {
  const err = new Error(dbErr.message)
  err.status = 500
  err.simplified = true // Need this flag in case of Error code >= 500.
  err.name = 'databaseError'
  err.enclosedmessage = errorMessage.database
  err.errobj = dbErr

  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * Duplication Error
 * @param {string} message
 * @param {callback} [next] - Express' next middleware method.
 * @throws {Error} Will always throw error since this function must be used within logic function
 *                 not the express' router, hence not using next() hook.
 */
export function unprocessableError(message = 'Unprocessable request.', next) {
  const err = new Error(message)
  err.status = 422
  err.name = 'unprocessableError'
  err.enclosedmessage = message

  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * File upload error
 * @param insErr {Error} - Instance of error thrown by library
 * @param {callback} [next] - Express' next middleware method.
 * @throws {Error} Will always throw error since this function must be used within logic function
 *                 not the express' router, hence not using next() hook.
 */
export function fileUploadError(insErr, next) {
  const err = new Error(insErr.message)
  err.name = 'fileUploadError'
  err.enclosedmessage = errorMessage.fileupload

  if (err.code === 'InvalidAccessKeyId') {
    err.status = 503
    err.simplified = true
  } else {
    err.status = 400
  }
  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * Queue connection error
 * @param errObj {Error} - Instance of error thrown by library
 * @param [next] {callback} - Express' next middleware method.
 * @throws {Error} Will always throw error since this function must be used within logic function
 *                 not the express' router, hence not using next() hook.
 */
export function queueConnectionError(errObj, next) {
  const err = new Error(errObj.message)
  err.name = `queueConnectionError`
  err.enclosedmessage = 'Queue connection error'

  if (typeof next === 'function') next(err)
  else throw err
}

/**
 * Queue assertion error
 * @param errObj {Error} - Instance of error thrown by library
 * @param [next] {callback} - Express' next middleware method.
 * @throws {Error} Will always throw error since this function must be used within logic function
 *                 not the express' router, hence not using next() hook.
 */
export function queueAssertError(errObj, next) {
  const err = new Error(errObj.message)
  err.name = 'queueAssertError'
  err.enclosedmessage = 'Queue assertion error'

  if (typeof next === 'function') next(err)
  else throw err
}

/** Error messages to be thrown. */
export const errorMessage = {
  unsupportcontenttype: 'Unsupported Media Type',
  httpmethod: 'HTTP method is not supported',
  database: 'Database Error',
  usercomination: 'Incorrect username or password',
  userforbidden: 'Forbidden',
  notfound: 'Not Found',
  tokenexpired: 'Token expired',
  tokeninvalid: 'Invalid token',
  fileupload: 'File upload error',
  internal: 'Internal error',
  external: 'External service error',
  notowner: 'Not Owner of loan'
}

export const handleError = async response => {
  let messageError = ''
  let json
  try {
    json = await response.json()
    messageError = json.message
  } catch (error) {
    // api does not return error object use default statusText
    messageError = `
      Cannot parse response.body as json, statusText is ${response.statusText}`
  }
  if (!response.ok) {
    const error = new Error(messageError)
    if (json) {
      error.code = json.code
    }
    error.code = error.code || response.status
    error.response = response
    throw error
  }
  return json
}
