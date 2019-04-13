/**
 * mongoDB (mongoose) migration index
 * @module db/mongo/migrations
 */

import Yargs from 'yargs'
import config from '../../../misc/config'
import * as EventMigrate from './Events'
import * as __appmeta from './_appmeta'
import db from '../'

const _appmeta = db.get('_appmeta')

const migrateSettingKey = 'migratedStaticData'
export async function up() {
  let migrated = await _appmeta.find({ name: migrateSettingKey })[0]

  if (migrated) {
    if (migrated.value) {
      console.log('Mongo static data is already migrated') // eslint-disable-line
      return Promise.resolve()
    }
    migrated.value = true
  } else {
    migrated = {
      name: migrateSettingKey,
      value: true,
    }
  }

  const promiseList = [EventMigrate.up(), __appmeta.up(), _appmeta.insert(migrated)]

  return Promise.all(promiseList)
}

export async function down() {
  let migrated = await _appmeta.find({ name: migrateSettingKey })[0]

  if (migrated) {
    if (migrated.value) {
      migrated.value = false
    }
  } else {
    migrated = {
      name: migrateSettingKey,
      value: false,
    }
  }

  const promiseList = [EventMigrate.down(), __appmeta.down(), _appmeta.insert(migrated)]

  return Promise.all(promiseList)
}

/* If this script is ran standalone */
/* istanbul ignore next */
if (require.main === module) {
  const args = Yargs.options({
    d: { type: 'boolean' }, // down
    u: { type: 'boolean' }, // up
    a: { type: 'boolean' }, // all
  }).argv

  let pipe = new Promise(resolve => {
    console.log(`Mongo migration for ${config.environment} started.`) // eslint-disable-line
    resolve()
  })

  if (args.d || args.a)
    pipe = pipe.then(() => down()).then(() => console.log('Mongo migration: Down complete')) // eslint-disable-line
  if (args.u || args.a)
    pipe = pipe.then(() => up()).then(() => console.log('Mongo migration: Up complete')) // eslint-disable-line

  pipe
    .catch(err => {
      console.error(err.message) // eslint-disable-line
      process.exit(1)
    })
    .then(() => process.exit(0))
}
