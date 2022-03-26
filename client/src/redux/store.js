import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './user'
import { messagesReducer } from './messages'
import { productApi } from './RTKquery/product'
import { authAPI } from './RTKquery/auth'
import { userAPI } from './RTKquery/user'

const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  [productApi.reducerPath]: productApi.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware(
      //! Какая-то хрень, чтобы вебсокет объект хранить в сторе, потом разобраться
      // {
      //   serializableCheck: {
      //     // Ignore these action types
      //     ignoredActions: ['messages/setSocket', 'user/setUser'],
      //     // Ignore these field paths in all actions
      //     // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      //     // Ignore these paths in the state
      //     // ignoredPaths: ['items.dates'],
      //   },
      // }
    )
      .concat(productApi.middleware)
      .concat(authAPI.middleware)
      .concat(userAPI.middleware)
  )
})

export default store