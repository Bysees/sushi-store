export class CartService {

  static set(cartItems) {
    localStorage.setItem('cart', cartItems)
  }

  static get() {
    return localStorage.getItem('cart')
  }

  static remove() {
    localStorage.removeItem('cart')
  }
}
