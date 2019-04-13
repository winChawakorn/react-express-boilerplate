const Applications = 'Applications'

exports.up = (knex, Promise) => {
  return Promise.resolve()
    .then(() => knex.schema.createTable(Applications, ApplicationsTableSchema(knex)))
}

exports.down = (knex, Promise) => {
  return Promise.resolve()
    .then(() => knex.schema.dropTable(Applications))
}

function ApplicationsTableSchema(knex) {
  return table => {
    table.increments()
    table.string('firstname')
    table.string('lastname')
    table.timestamp('createdDate').defaultTo(knex.fn.now())
  }
}
