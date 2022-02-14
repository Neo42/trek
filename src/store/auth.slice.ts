import {createSlice} from '@reduxjs/toolkit'
import * as auth from 'auth/provider'
import {AppDispatch} from 'store'
import {AuthForm} from 'auth/index.d'
import {initializeUser} from 'auth/context'
import {User} from 'screens/projects/index.d'
import {RootState} from './index'

interface State {
  user: User | null
}

const initialState: State = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

const {setUser} = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const handleLogin = (data: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(data).then((user) => dispatch(setUser(user)))
export const handleRegister = (data: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(data).then((user) => dispatch(setUser(user)))
export const handleLogout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)))
export const handleInitializeUser = () => (dispatch: AppDispatch) =>
  initializeUser().then((user) => dispatch(setUser(user)))
