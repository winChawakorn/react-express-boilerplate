import applications from './routes/applications'
import express from 'express'
import moment from 'moment'

const app = express()
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`[${moment().format()}] Server started on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send({ mk: 'api' })
})

app.use('/applications', applications)
