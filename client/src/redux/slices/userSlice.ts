import { IUser } from '../../models/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SetUser = IUser
type SetUserAuth = Pick<IUser, 'login' | 'role'>
type SetUserInfo = Pick<IUser, 'name' | 'description'>
type SetUserAvatar = Pick<IUser, 'avatar'>

type UserInitialState = IUser

const initialState: UserInitialState = {
  login: null,
  role: null,
  name: null,
  description: null,
  avatar: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<SetUser>) {
      state.login = payload.login
      state.role = payload.role
      state.name = payload.name
      state.description = payload.description
      state.avatar = payload.avatar
    },
    removeUser(state) {
      state.login = null
      state.role = null
      state.name = null
      state.description = null
      state.avatar = null
    },
    setUserAuth(state, { payload }: PayloadAction<SetUserAuth>) {
      state.login = payload.login
      state.role = payload.role
    },
    setUserInfo(state, { payload }: PayloadAction<SetUserInfo>) {
      state.name = payload.name
      state.description = payload.description
    },
    setUserAvatar(state, { payload }: PayloadAction<SetUserAvatar>) {
      state.avatar = payload.avatar
    }
  }
})

export const userReducer = userSlice.reducer
export const { setUser, removeUser, setUserInfo, setUserAvatar } =
  userSlice.actions
