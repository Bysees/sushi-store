import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { cartMiddleware } from './middlewares/cartMiddleware'
import { combinePreloadedStates } from './utils/combinePreloadedStates'
import { cartRehydrate } from './rehydrates/cart'
import { userReducer, cartReducer } from './slices'
import { authApi, categoryApi, productApi, userApi } from './RTKquery'


const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
})

const preloadedState = combinePreloadedStates({
  cart: cartRehydrate,
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(categoryApi.middleware)
      .concat(cartMiddleware)
  )
})

export default store