import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {apiUrl} from '../../../constants'
import {client} from '../use-api-client'

const server = setupServer()

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('should send async requests', async () => {
  const endpoint = 'test-point'
  const mockResult = {mock: 'mock'}

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult)),
    ),
  )

  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('should carry a token', async () => {
  const token = 'FAKE_TOKEN'
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'mock'}

  let request: any

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  await client(endpoint, {token})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})
