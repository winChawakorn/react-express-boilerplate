import applications from './routes/applications'
import express from 'express'
import moment from 'moment'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = '8888'

app.listen(PORT, () => {
  console.log(`[${moment().format()}] Server started on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send({ mk: 'api' })
})

app.use('/applications', applications)
