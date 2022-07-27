import { CartInitialState } from '../slices/cartSlice';
import { CartStorage } from "../../storage/cartStorage";

export const cartRehydrate = (): CartInitialState | undefined => {
  const cartFromStorage: string | null = CartStorage.get()

  if (cartFromStorage) {
    return JSON.parse(cartFromStorage) as CartInitialState
  }

};