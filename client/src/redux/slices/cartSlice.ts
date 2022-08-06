import { ICart } from '../../models/cart'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AddToCart = ICart
type RemoveFromCart = Pick<ICart, 'id' | 'amount'>

export type CartInitialState = {
  cartItems: ICart[]
  totalPrice: number
}

const initialState: CartInitialState = {
  cartItems: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<AddToCart>) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      if (cartItem) {
        cartItem.amount++
      } else {
        state.cartItems.push({ ...payload, amount: 1 })
      }
      state.totalPrice += payload.price
    },
    removeFromCart: (state, { payload }: PayloadAction<RemoveFromCart>) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      if (!cartItem) {
        return
      }
      if (cartItem.amount >= 1) {
        cartItem.amount -= payload.amount
      }
      if (cartItem.amount === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== payload.id
        )
      }
      state.totalPrice = state.totalPrice - cartItem.price * payload.amount
    },
    clearCart: (state) => {
      state.cartItems = []
      state.totalPrice = 0
    }
  }
})

export const cartReducer = cartSlice.reducer
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
