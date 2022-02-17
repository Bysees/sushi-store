import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
  name: '',
  role: ''
}

const name = 'user'

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAuthorized(state, action) {
      state.authorized = action.payload
    },
    setUser(state, action) {
      state.name = action.payload.name
      state.role = action.payload.role
    },
  }
})

export const userReducer = userSlice.reducer
export const { setAuthorized, setUser } = userSlice.actions



