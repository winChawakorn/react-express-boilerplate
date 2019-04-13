/**
 * _appmeta mongoDB (mongoose) migration
 * @module db/mongo/migrations/_appmeta
 */

import { _appmeta } from '../index'

export async function up() {
  return Promise.resolve()
}

export async function down() {
  return _appmeta.deleteMany({ name: 'applicationRunningNumber' }).exec()
}

if (require.main === module) {
  down()
    .then(() => console.log('_appmeta down complete!')) // eslint-disable-line
    .then(up)
    .then(() => console.log('_appmeta up completed!')) // eslint-disable-line
    .catch(err => {
      console.error(err.message) // eslint-disable-line
      process.exit(1)
    })
    .then(() => process.exit(0))
}
