export const reorder = ({
  fromId,
  type,
  referenceId,
  list,
}: {
  list: {id: number}[]
  fromId: number
  type: 'after' | 'before'
  referenceId: number
}) => {
  const copiedList = [...list]
  const movingItemIndex = copiedList.findIndex((item) => item.id === fromId)
  if (!referenceId) {
    return insertAfter([...copiedList], movingItemIndex, copiedList.length - 1)
  }
  const targetIndex = copiedList.findIndex((item) => item.id === referenceId)
  const insert = type === 'after' ? insertAfter : insertBefore
  return insert([...copiedList], movingItemIndex, targetIndex)
}

const insertBefore = (list: unknown[], from: number, to: number) => {
  const toItem = list[to]
  const removedItem = list.splice(from, 1)[0]
  const toIndex = list.indexOf(toItem)
  list.splice(toIndex, 0, removedItem)
  return list
}

const insertAfter = (list: unknown[], from: number, to: number) => {
  const toItem = list[to]
  const removedItem = list.splice(from, 1)[0]
  const toIndex = list.indexOf(toItem)
  list.splice(toIndex + 1, 0, removedItem)
  return list
}
