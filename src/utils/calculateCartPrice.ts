import { TCartItem } from "@/types/cart.types";

export const calculateCartPrice = (item: TCartItem[]) => {
  const totalPrice = item?.reduce((sum: number, cartItem: TCartItem) => {
    sum += cartItem?.price * cartItem?.quantity;
    return sum;
  }, 0);

  return totalPrice;
};
