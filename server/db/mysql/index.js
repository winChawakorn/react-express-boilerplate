const config = require('../../misc/config')

const knex = require('knex')({
  client: 'mysql',
  connection: config.mysql_connection,
})

export default knex
