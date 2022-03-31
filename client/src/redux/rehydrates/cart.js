import { CartStorage } from "../../storage/cartStorage";

export const cartRehydrate = () => {
  const cart = JSON.parse(CartStorage.get())
  if (cart !== null) {
    return cart;
  }
};