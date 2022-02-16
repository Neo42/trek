import {setupWorker} from 'msw'
import {userHandlers, restHandlers} from 'mocks/handlers'

const handlers = [...userHandlers, ...restHandlers]

export default setupWorker(...handlers)
