import {LiveStorage} from '@mswjs/storage'
import {
  isLocalDataLoadedKey,
  usersKey,
  userTokenKey,
  projectsKey,
  taskTagsKey,
  tasksKey,
  taskTypesKey,
  taskGroupsKey,
  taskOrderKey,
  kanbansKey,
  kanbanOrderKey,
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
  taskTagsKey,
  kanbansKey,
  tasksKey,
  taskTypesKey,
  taskGroupsKey,
  taskOrderKey,
  kanbanOrderKey,
)
export default storage
