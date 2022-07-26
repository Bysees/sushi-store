import { createSlice } from "@reduxjs/toolkit";

/**
* @param CartItem
* * id: string
* * title: string
* * img: string
* * price: number
* * amount: number
*/

/**
* @param initialState
* * cartItems: CartItem[]
* * totalPrice: number
*/

const initialState = {
  cartItems: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
      * @param addToCart //? payload
      * * id: string
      * * title: string
      * * img: string
      * * price: number
      * * amount: number
    */
    addToCart: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id)
      if (cartItem) {
        cartItem.amount++
      } else {
        state.cartItems.push({ ...payload, amount: 1 })
      }
      state.totalPrice += payload.price
    },
    /**
     * @param removeFromCart //? payload
     * * id: string
     * * amount: number
    */
    removeFromCart: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id)
      if (!cartItem) {
        return
      }
      if (cartItem.amount >= 1) {
        cartItem.amount -= payload.amount
      }
      if (cartItem.amount === 0) {
        state.cartItems = state.cartItems.filter((item) => item.id !== payload.id)
      }
      state.totalPrice = state.totalPrice - (cartItem.price * payload.amount)
    },
    clearCart: (state) => {
      state.cartItems = []
      state.totalPrice = 0
    }
  }
})

export const cartReducer = cartSlice.reducer
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions