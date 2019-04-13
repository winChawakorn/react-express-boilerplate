import express from 'express'

import appMiddleware from './middleware/main-middleware'
import errorHandler from './middleware/error-middleware'
import routes from './routes'

const app = express()

appMiddleware(app)
app.use('/', routes)
errorHandler(app)

export default app
