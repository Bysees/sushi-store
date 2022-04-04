import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import { messagesReducer } from './slices/messages'
import { userReducer } from './slices/user'
import { cartReducer } from './slices/cart'
import { productApi } from './RTKquery/product'
import { authAPI } from './RTKquery/auth'
import { userAPI } from './RTKquery/user'
import { cartMiddleware } from './middlewares/cartMiddleware'
import { combinePreloadedStates } from './utils/combinePreloadedStates'
import { cartRehydrate } from './rehydrates/cart'

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  // messages: messagesReducer,
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