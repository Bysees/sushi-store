import { Middleware } from "@reduxjs/toolkit"
import { CartStorage } from "../../storage/cartStorage"
import { addToCart, removeFromCart } from "../slices/cartSlice"
import { RootState } from "../store"

export const cartMiddleware: Middleware<{}, RootState> = ({ getState }) => (next) => (action) => {
  const result = next(action)
  const cart = getState().cart

  if (addToCart.match(action) || removeFromCart.match(action)) {

    if (cart.cartItems.length > 0) {
      CartStorage.set(JSON.stringify(cart))
    } else {
      CartStorage.remove()
    }

  }

  return result
}