export type AsyncState<Data> =
  | {
      status: 'success'
      error: null
      data: Data
    }
  | {
      status: 'error'
      error: Error
      data: null
    }
  | {
      status: 'loading'
      error: null
      data: null
    }
  | {
      status: 'idle'
      error: null
      data: null
    }

export interface Config extends RequestInit {
  data?: object
  token?: string
}
