import {LiveStorage} from '@mswjs/storage'
import {
  usersKey,
  userTokenKey,
  projectsKey,
  isLocalDataLoadedKey,
} from '../constants'

function storageFactory(...keys) {
  const storage = new Map()
  keys.forEach((key) =>
    storage.set(
      key,
      new LiveStorage(
        key,
        key === userTokenKey ? '' : key === isLocalDataLoadedKey ? false : [],
      ),
    ),
  )
  return storage
}

const storage = storageFactory(
  userTokenKey,
  usersKey,
  projectsKey,
  isLocalDataLoadedKey,
)
export default storage
