import { mysql_connection as connection } from '../../config'

const knex = require('knex')({
  client: 'mysql',
  connection,
})

export default knex
