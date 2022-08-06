import { Middleware } from '@reduxjs/toolkit'
import { CartStorage } from '../../services/storage/cartStorage'
import { addToCart, removeFromCart } from '../slices/cartSlice'
import { RootState } from '../store'

export const cartMiddleware: Middleware<{}, RootState> =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action)
    const cart = getState().cart
    const hasItemsInCart = cart.cartItems.length > 0

    if (addToCart.match(action) || removeFromCart.match(action)) {
      if (hasItemsInCart) {
        CartStorage.set(cart)
      } else {
        CartStorage.remove()
      }
    }

    return result
  }
