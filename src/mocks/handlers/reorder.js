import db from 'mocks/db'
import storage from 'mocks/storage'
import {rest} from 'msw'
import {
  apiUrl,
  kanbanOrderKey,
  kanbansKey,
  tasksKey,
  taskOrderKey,
} from '../../constants'

export const reorderHandlers = [
  rest.post(`${apiUrl}/kanbans/reorder`, async (req, res, ctx) => {
    const {fromId, referenceId, type} = req.body
    const kanbanOrders = storage.get(kanbanOrderKey).getValue()
    const newOrders = reorder({list: kanbanOrders, fromId, referenceId, type})

    newOrders.forEach(({id}, index) =>
      db[kanbansKey].update({
        where: {id: {equals: id}},
        data: {orderId: index},
      }),
    )

    storage.get(kanbansKey).update(() => db[kanbansKey].getAll())

    return res(ctx.json({}))
  }),

  rest.post(`${apiUrl}/tasks/reorder`, async (req, res, ctx) => {
    const {
      type,
      fromId: fromTaskId,
      referenceId,
      fromKanbanId,
      toKanbanId,
    } = req.body

    if (fromKanbanId !== toKanbanId) {
      await db[tasksKey].update({
        where: {id: {equals: fromTaskId}},
        data: {kanbanId: toKanbanId},
      })
    }

    const tasksOrders = storage.get(taskOrderKey).getValue()
    const newOrders = reorder({
      list: tasksOrders,
      fromId: fromTaskId,
      referenceId,
      type,
    })

    newOrders.forEach(({id}, index) =>
      db[tasksKey].update({
        where: {id: {equals: id}},
        data: {orderId: index},
      }),
    )

    storage.get(tasksKey).update(() => db[tasksKey].getAll())

    return res(ctx.json({}))
  }),
]

function reorder({list, fromId, type, referenceId}) {
  const movingItemIndex = list.findIndex((item) => item.id === fromId)
  if (!referenceId) {
    return insertAfter(list, movingItemIndex, list.length - 1)
  }
  const targetIndex = list.findIndex((item) => item.id === referenceId)
  const insert = type === 'after' ? insertAfter : insertBefore
  return insert(list, movingItemIndex, targetIndex)
}

const insertBefore = (list, from, to) => {
  const toItem = list[to]
  const removedItem = list.splice(from, 1)[0]
  const toIndex = list.indexOf(toItem)
  list.splice(toIndex, 0, removedItem)
  return list
}

const insertAfter = (list, from, to) => {
  const toItem = list[to]
  const removedItem = list.splice(from, 1)[0]
  const toIndex = list.indexOf(toItem)
  list.splice(toIndex + 1, 0, removedItem)
  return list
}
