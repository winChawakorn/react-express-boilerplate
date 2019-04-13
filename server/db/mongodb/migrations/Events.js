import db from '../index'

export async function up() {
  // return Promise.resolve()
  return Promise.all([db.get('Events').insert({ name: 'test', id: '0', event: 'start' })])
}

export async function down() {
  return db.get('Events').deleteMany().exec()
}

if (require.main === module) {
  down()
    .then(() => console.log('Events down complete!')) // eslint-disable-line
    .then(up)
    .then(() => console.log('Events up completed!')) // eslint-disable-line
    .catch(err => {
      console.error(err.message) // eslint-disable-line
      process.exit(1)
    })
    .then(() => process.exit(0))
}
