/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

// ! for ordering directly from product
export const orderDirectFromProduct = async (
  payload: { user: string; quantity: number; product: string; price: number },
  directOrder: any
) => {
  const taostId = toast.loading("Placing order ....");

  try {
    const result = await directOrder(payload);

    console.log(result?.data);

    if (result?.error) {
      const errorMessage = (result?.error as any)?.data?.message;
      console.log(errorMessage);
      toast.error(errorMessage, {
        id: taostId,
        duration: 1400,
      });
    }

    if (result?.data) {
      const successMsg = result?.data?.message;
      const paymentUrl = result?.data?.data;

      toast.success(successMsg, {
        id: taostId,
        duration: 2000,
      });

      window.location.href = paymentUrl;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while ordering!!!", { duration: 1400 });
  }
};

// ! for adding cart quantity
export const addCartQuantity = async (
  payload: { productId: string; quantity: number },
  addItemQuantity: any,
  refetch: () => QueryActionCreatorResult<any>
) => {
  try {
    const toastId = toast.loading("Adding to cart quantity!! ");

    const result = await addItemQuantity(payload);

    //  *  for any  error
    if (result?.error) {
      const errorMessage = (result?.error as any)?.data?.message;
      console.log(errorMessage);
      toast.error(errorMessage, {
        duration: 1400,
        id: toastId,
      });
    }

    if (result?.data?.success) {
      toast.success(result?.data?.message, { duration: 1500, id: toastId });
      refetch();
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong !!!", { duration: 1200 });
  }
};

// ! reducing cart quantity
export const reduceCartQuantity = async (
  payload: { productId: string; quantity: number },
  decreaseItemQuantity: any,
  refetch: () => QueryActionCreatorResult<any>
) => {
  try {
    const toastId = toast.loading("Decreaseing cart quantity!! ");
    const result = await decreaseItemQuantity(payload);
    //  *  for any  error
    if (result?.error) {
      const errorMessage = (result?.error as any)?.data?.message;
      toast.error(errorMessage, {
        duration: 1400,
        id: toastId,
      });
    }
    if (result?.data?.success) {
      toast.success(result?.data?.message, { duration: 1500, id: toastId });
      refetch();
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong !!!", { duration: 1200 });
  }
};

// ! for deleting cart item
export const deleteCartItem = async (
  payload: { productId: string },
  removeCartItem: any,
  refetch: () => QueryActionCreatorResult<any>
) => {
  try {
    const toastId = toast.loading("Deleting Cart Item!!");

    const result = await removeCartItem(payload);

    //  *  for any  error
    if (result?.error) {
      const errorMessage = (result?.error as any)?.data?.message;
      toast.error(errorMessage, {
        duration: 1400,
        id: toastId,
      });
    }

    if (result?.data?.success) {
      toast.success(result?.data?.message, { duration: 1500, id: toastId });
      refetch();
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while deleting cart item!!!", {
      duration: 1200,
    });
  }
};

// ! for odering item from cart
export const orderItemFromCart = async (
  payload: { address: string },
  orderFromCart: any
) => {
  const taostId = toast.loading("Placing order ....");

  try {
    const result = await orderFromCart(payload);

    console.log(result?.data);

    if (result?.error) {
      const errorMessage = (result?.error as any)?.data?.message;
      console.log(errorMessage);
      toast.error(errorMessage, {
        id: taostId,
        duration: 1400,
      });
    }

    if (result?.data) {
      const successMsg = result?.data?.message;
      const paymentUrl = result?.data?.data;

      toast.success(successMsg, {
        id: taostId,
        duration: 2000,
      });

      window.location.href = paymentUrl;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while ordering!!!", { duration: 1400 });
  }
};
