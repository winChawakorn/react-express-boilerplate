/**
 * User input validator
 * @module misc/validator
 */

import { validationError, validationErrorFormatter } from '../misc/error'
import { validationResult } from 'express-validator/check/index'

/**
 * Check if user input is valid whether the body, query, params, header or cookie
 * using express-validator (suit the simple and small request)
 * @param {array} validators - Array of validator to be use to validate input
 * @return {array<function>} - Express/Connect middleware to check permission based on req.permissions
 *                      and will invoke next() if valid, call next(err) if invalid
 */
export function validate(validators) {
  return [].concat(
    /* istanbul ignore next */
    validators || [],
    (req, res, next) => {
      const error = validationResult(req)
      if (error.isEmpty()) next()
      else {
        const errorMessage = error
          .formatWith(validationErrorFormatter)
          .array({ onlyFirstError: true })
          .join(', ')
        validationError(errorMessage, next)
      }
    }
  )
}

/**
 * Check if req.body is strictly valid to JSON schema
 * using Ajv (suit the large request and having various datatypes and strict rules)
 * @param ajvValidator
 * @return {function(req, res, next)} Express/Connect middleware to check permission based on req.permissions
 *                      and will invoke next() if valid, call next(err) if invalid
 */
export function ajvValidate(ajvValidator) {
  return (req, res, next) => {
    if (ajvValidator(req.body)) {
      next()
    } else {
      // If all errors is needed, put { allErrors: true } to Ajv instance.
      const errorList = ajvValidator.errors || []
      const errorMessage = errorList.map(error => `${error.dataPath} ${error.message}`.trim()).join(', ')
      validationError(errorMessage, next)
    }
  }
}

/**
 * Standalone ajv validator, return nothing if pass, thorw error other wise
 * @param data
 * @param ajvValidator
 */
export function ajvStandalone(data, ajvValidator) {
  if (!ajvValidator(data)) {
    // If all errors is needed, put { allErrors: true } to Ajv instance.
    const errorList = ajvValidator.errors || []
    const errorMessage = errorList.map(error => `${error.dataPath} ${error.message}`.trim()).join(', ')
    throw validationError(errorMessage)
  }
}
