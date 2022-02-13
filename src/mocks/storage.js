import {LiveStorage} from '@mswjs/storage'
import {usersKey, userTokenKey, projectsKey} from '../constants'

function storageFactory(...keys) {
  const storage = new Map()
  keys.forEach((key) =>
    storage.set(key, new LiveStorage(`${key}`, key === userTokenKey ? '' : [])),
  )
  return storage
}

const storage = storageFactory(userTokenKey, usersKey, projectsKey)
export default storage
