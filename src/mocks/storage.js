import {LiveStorage} from '@mswjs/storage'
import {usersKey, userTokenKey} from '../constants'

function storageFactory(...keys) {
  const storage = new Map()
  keys.forEach((key) =>
    storage.set(
      `${key}`,
      new LiveStorage(`${key}`, key === userTokenKey ? '' : []),
    ),
  )
  return storage
}

const storage = storageFactory(userTokenKey, usersKey)
export default storage
