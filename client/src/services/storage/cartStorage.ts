import { CartInitialState } from '../../redux/slices/cartSlice'

const CART = 'cart'

export class CartStorage {
  static set(cartState: CartInitialState) {
    sessionStorage.setItem(CART, JSON.stringify(cartState))
  }

  static get(): CartInitialState | undefined {
    const cart = sessionStorage.getItem(CART)
    if (cart) {
      return JSON.parse(cart) as CartInitialState
    }
  }

  static remove() {
    sessionStorage.removeItem(CART)
  }
}
