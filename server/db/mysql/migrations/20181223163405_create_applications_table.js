const Users = 'Users'

exports.up = (knex, Promise) => {
  return Promise.resolve()
    .then(() => knex.schema.createTable(Users, UsersTableSchema(knex)))
    .then(() => knex(Users).insert({ id: 1, username: 'admin', password: '$2b$10$EkSD1uQBud2sgM3KEAj3q.xc46jnmMaHi6fXR0c9u0fkShZR1.F6y' }))
}

exports.down = (knex, Promise) => {
  return Promise.resolve()
    .then(() => knex.schema.dropTable(Users))
}

function UsersTableSchema(knex) {
  return table => {
    table.increments()
    table.string('username').unique().notNullable()
    table.string('password').notNullable()
    table.timestamp('createdDate').defaultTo(knex.fn.now())
  }
}
