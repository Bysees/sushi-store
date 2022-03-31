import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  role: null,
  name: null,
  description: null,
  avatar: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login
      state.role = action.payload.role
      state.name = action.payload.name
      state.description = action.payload.description
      state.avatar = action.payload.avatar
    },
    removeUser(state) {
      state.login = null
      state.role = null
      state.name = null
      state.description = null
      state.avatar = null
    },
    setUserAuth(state, action) {
      state.login = action.payload.login
      state.role = action.payload.role
    },
    setUserInfo(state, action) {
      state.name = action.payload.name
      state.description = action.payload.description
    },
    setUserAvatar(state, action) {
      state.avatar = action.payload.avatar
    }
  }
})

export const userReducer = userSlice.reducer
export const { setUser, removeUser, setUserInfo, setUserAvatar } = userSlice.actions



