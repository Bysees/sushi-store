import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './user'
import { messagesReducer } from './messages'
import { productApi } from './RTKquery/product'
import { authAPI } from './RTKquery/auth'
import { userAPI } from './RTKquery/user'
import { cartReducer } from './cart'
import { cartMiddleware } from './middlewares/cartMiddleware'
import { combinePreloadedStates } from './utils/combinePreloadedStates'
import { cartRehydrate } from './rehydrates/cart'

const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
})

const preloadedState = combinePreloadedStates({
  cart: cartRehydrate,
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware(
      //! Какая-то хрень, чтобы вебсокет объект хранить в сторе, потом разобраться
      // {
      //   serializableCheck: {
      //     ignoredActions: ['messages/setSocket', 'user/setUser'],
      //   },
      // }
    )
      .concat(productApi.middleware)
      .concat(authAPI.middleware)
      .concat(userAPI.middleware)
      .concat(cartMiddleware)
  )
})

export default store