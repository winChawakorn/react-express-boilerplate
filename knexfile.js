const path = require("path")
const { mysql_connection } = require("./server/config")

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      timezone: 'Z',
      ...mysql_connection
    },
    pool: { min: 0, max: 300 },
    migrations: {
      directory: path.resolve('./server/db/mysql/migrations'),
    },
    seeds: {
      directory: path.resolve('./server/db/mysql/seeds'),
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
