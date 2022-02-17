import {LiveStorage} from '@mswjs/storage'
import {
  isLocalDataLoadedKey,
  usersKey,
  userTokenKey,
  projectsKey,
  projectPhasesKey,
  kanbansKey,
  tasksKey,
  taskTypesKey,
  taskGroupsKey,
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
  isLocalDataLoadedKey,
  userTokenKey,
  usersKey,
  projectsKey,
  projectPhasesKey,
  kanbansKey,
  tasksKey,
  taskTypesKey,
  taskGroupsKey,
)
export default storage
