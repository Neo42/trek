import {setupWorker} from 'msw'
import db from './db'
import {userHandlers} from 'mocks/handlers'

const handlers = [...db.user.toHandlers('rest'), ...userHandlers]

export const server = setupWorker(...handlers)
