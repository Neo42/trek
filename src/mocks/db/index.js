import {factory, primaryKey} from '@mswjs/data'
import {password, username, uuid} from 'minifaker'
import 'minifaker/locales/en'
import {authenticate} from './methods'

const db = factory({
  user: {
    username: primaryKey(username),
    password: password,
    id: uuid.v4,
  },
})

db.user = {
  ...db.user,
  authenticate,
}

window.deleteDB = (dbKey) => {
  db[dbKey].deleteMany({where: {}})
  console.log(`All data in ${dbKey}DB deleted.`)
}

window.showDB = (dbKey) => {
  console.log({[dbKey]: db[dbKey].getAll()})
}

export default db
