import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './slices/user'
import { cartReducer } from './slices/cart'
import { productApi } from './RTKquery/product'
import { categoryApi } from './RTKquery/category'
import { authAPI } from './RTKquery/auth'
import { userAPI } from './RTKquery/user'
import { cartMiddleware } from './middlewares/cartMiddleware'
import { combinePreloadedStates } from './utils/combinePreloadedStates'
import { cartRehydrate } from './rehydrates/cart'


const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
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
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authAPI.middleware)
      .concat(userAPI.middleware)
      .concat(categoryApi.middleware)
      .concat(cartMiddleware)
  )
})

export default store