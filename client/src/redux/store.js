import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './user'
import { messagesReducer } from './messages'

const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        //! Временно, разобраться потом чё к чему
        ignoredActions: ['messages/setSocket', 'user/setUser', 'user/setAuthorized'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        // ignoredPaths: ['items.dates'],
      },
    }),
})

export default store