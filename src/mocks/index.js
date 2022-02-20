import {setupWorker} from 'msw'
import {userHandlers, restHandlers, reorderHandlers} from 'mocks/handlers'

const handlers = [...userHandlers, ...restHandlers, ...reorderHandlers]

export default setupWorker(...handlers)
