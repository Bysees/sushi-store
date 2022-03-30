import { CartService } from "../../storage/cartService"
import { addToCart, removeFromCart } from "../cart"

export const cartMiddleware = ({ getState }) => (next) => (action) => {
  const result = next(action)
  const cart = getState().cart

  if (addToCart.match(action) || removeFromCart.match(action)) {

    if (cart.cartItems.length > 0) {
      CartService.set(JSON.stringify(cart))
    } else {
      CartService.remove()
    }

  }

  return result
}