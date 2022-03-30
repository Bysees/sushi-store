import { CartService } from "../../storage/cartService";

export const cartRehydrate = () => {
  const cart = JSON.parse(CartService.get())
  if (cart !== null) {
    return cart;
  }
};