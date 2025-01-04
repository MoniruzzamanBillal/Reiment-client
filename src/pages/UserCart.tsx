/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItemCard, FormSubmitLoading, NoCartItem } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  useAddItemQuantityMutation,
  useDecreaseItemQuantityMutation,
  useGetUserCartQuery,
  useRemoveCartItemMutation,
} from "@/redux/features/cart/cart.api";
import { TCartItem } from "@/types/cart.types";
import { calculateCartPrice } from "@/utils/calculateCartPrice";
import { toast } from "sonner";

const UserCart = () => {
  const {
    data: cartData,
    isLoading: cartDataLoading,
    refetch: refetchCart,
  } = useGetUserCartQuery(undefined);

  const [addItemQuantity, { isLoading: cartItemAddingLoading }] =
    useAddItemQuantityMutation();

  const [decreaseItemQuantity, { isLoading: decreaseCartLoading }] =
    useDecreaseItemQuantityMutation();

  const [removeCartItem, { isLoading: removeCartItemLoading }] =
    useRemoveCartItemMutation();

  //   console.log(cartData?.data);
  //   console.log(cartData?.data?.cartItems);

  const totalCartPrice = calculateCartPrice(cartData?.data?.cartItems);

  //   ! function for adding cart quantity
  const handleAddQuantity = async (item: TCartItem) => {
    const payload = {
      productId: item?.product?._id,
      quantity: 1,
    };

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
        refetchCart();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong !!!", { duration: 1200 });
    }
  };

  // ! function for reducing cart quantity
  const handleReduceQuantity = async (item: TCartItem) => {
    if (item?.quantity <= 1) {
      return;
    }

    const payload = {
      productId: item?.product?._id,
      quantity: 1,
    };

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
        refetchCart();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong !!!", { duration: 1200 });
    }
  };

  // ! function for deleting cart item
  const handleDeleteCartItem = async (item: any) => {
    const payload = {
      cartId: item?.cartId,
      cartItemId: item?.id,
    };

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
        refetchCart();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong !!!", { duration: 1200 });
    }
  };

  return (
    <>
      {(cartDataLoading ||
        cartItemAddingLoading ||
        decreaseCartLoading ||
        removeCartItemLoading) && <FormSubmitLoading />}

      <div className="ProductCartContainer">
        <div className="ProductCartWrapper   bg-gray-100 py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-lg px-4 md:px-8">
            <div className="mb-8 ">
              <h1 className="  text-center font-semibold text-indigo-500 text-lg xsm:text-xl sm:text-3xl md:text-3xl xl:text-4xl text-shadow-blue">
                Your Cart
              </h1>
            </div>

            <div className="mb-5 sm:mb-8 flex flex-col  sm:divide-y sm:border-t sm:border-b">
              {/* product - start  */}

              {!cartData?.data || cartData?.data?.cartItem?.length === 0 ? (
                <NoCartItem />
              ) : (
                <div className="cartItemRender p-3  bg-white shadow-md rounded-md border border-gray-300 ">
                  {cartData?.data?.cartItems &&
                    cartData?.data?.cartItems?.map((item: TCartItem) => (
                      // cart item card
                      <CartItemCard
                        key={item?._id}
                        item={item}
                        handleAddQuantity={handleAddQuantity}
                        handleReduceQuantity={handleReduceQuantity}
                        handleDeleteCartItem={handleDeleteCartItem}
                      />
                      // cart item card
                    ))}
                </div>
              )}
            </div>

            {/* bottom section strts  */}
            {/* totals - start  */}
            {cartData?.data?.length === 0 ? (
              ""
            ) : (
              <div className="flex flex-col items-end gap-4  ">
                {/* price card starts  */}
                <div className="w-full  bg-white border border-gray-200 rounded-md shadow-md p-4 sm:max-w-xs">
                  <div className=" py-2 ">
                    <div className="flex py-1 justify-between gap-4 text-gray-900">
                      <span className=" font-medium ">Subtotal</span>
                      <span>$ {totalCartPrice} </span>
                    </div>

                    <div className="flex  py-1 justify-between gap-4 text-gray-700">
                      <span className=" font-medium ">Shipping</span>
                      <span>$4</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-start justify-between gap-4 text-gray-800">
                      <span className="text-lg font-bold">Total</span>

                      <span className="flex flex-col items-end">
                        <span className="text-lg font-bold">
                          {totalCartPrice + 4} USD
                        </span>
                        <span className="text-sm text-gray-500">
                          including VAT
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* price card ends   */}

                <Button
                  className="  text-sm font-medium text-white  transition duration-100 bg-prime50 hover:bg-prime100 "
                  //   onClick={() => navigate("/checkout")}
                >
                  Check out
                </Button>
              </div>
            )}

            {/* totals - end  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCart;
