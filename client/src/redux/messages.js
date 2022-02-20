import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  socket: null,
  messages: [],
  newMessage: ''
}

const name = 'messages'

const messagesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setNewMessage(state, action) {
      state.newMessage = action.payload
    },
    setMessages(state, action) {
      state.messages = [...state.messages, action.payload]
    },
    setSocket(state, action) {
      state.socket = action.payload
    },
  }
})

export const { setMessages, setNewMessage, setSocket } = messagesSlice.actions
export const messagesReducer = messagesSlice.reducer