import { CartItemCard, FormSubmitLoading, NoCartItem } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  addCartQuantity,
  deleteCartItem,
  orderItemFromCart,
  reduceCartQuantity,
} from "@/functions/Cart.function";
import { useGetUserAddressQuery } from "@/redux/features/address/address.api";
import {
  useAddItemQuantityMutation,
  useDecreaseItemQuantityMutation,
  useGetUserCartQuery,
  useRemoveCartItemMutation,
} from "@/redux/features/cart/cart.api";
import { useOrderFromCartMutation } from "@/redux/features/order/order.api";
import { TCartItem } from "@/types/cart.types";
import { calculateCartPrice } from "@/utils/calculateCartPrice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserCart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: cartData,
    isLoading: cartDataLoading,
    refetch: refetchCart,
  } = useGetUserCartQuery(undefined);

  const { data: userAddress, refetch: userAddressRefetch } =
    useGetUserAddressQuery(undefined);

  const [addItemQuantity, { isLoading: cartItemAddingLoading }] =
    useAddItemQuantityMutation();

  const [decreaseItemQuantity, { isLoading: decreaseCartLoading }] =
    useDecreaseItemQuantityMutation();

  const [removeCartItem, { isLoading: removeCartItemLoading }] =
    useRemoveCartItemMutation();

  const [orderFromCart, { isLoading: orderingLoading }] =
    useOrderFromCartMutation();

  console.log(cartData?.data?.cartItems?.length);

  const totalCartPrice = calculateCartPrice(cartData?.data?.cartItems);

  //   ! function for adding cart quantity
  const handleAddQuantity = async (item: TCartItem) => {
    const payload = {
      productId: item?.product?._id,
      quantity: 1,
    };

    await addCartQuantity(payload, addItemQuantity, refetchCart);
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

    await reduceCartQuantity(payload, decreaseItemQuantity, refetchCart);
  };

  // ! function for deleting cart item
  const handleDeleteCartItem = async (item: TCartItem) => {
    const payload = {
      productId: item?.product?._id,
    };

    await deleteCartItem(payload, removeCartItem, refetchCart);
  };

  // ! for ordering item
  const handleOrderItem = async () => {
    if (userAddress?.data?.length < 1) {
      toast.warning("Add address for ordering items !!!");

      navigate("/dashboard/add-address", {
        state: location?.pathname,
      });
    } else {
      const payload = {
        address: userAddress?.data[0]?._id,
      };

      await orderItemFromCart(payload, orderFromCart);
    }
  };

  useEffect(() => {
    userAddressRefetch();
  }, [userAddress, userAddressRefetch]);

  return (
    <>
      {(cartDataLoading ||
        cartItemAddingLoading ||
        decreaseCartLoading ||
        removeCartItemLoading ||
        orderingLoading) && <FormSubmitLoading />}

      <div className="ProductCartContainer">
        <div className="ProductCartWrapper   bg-gray-100 py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-lg px-4 md:px-8">
            <div className="mb-8 ">
              <h1 className="  text-center font-semibold text-prime100 text-lg xsm:text-xl sm:text-3xl md:text-3xl xl:text-4xl text-shadow-blue">
                Your Cart
              </h1>
            </div>

            <div className="mb-5 sm:mb-8 flex flex-col  sm:divide-y sm:border-t sm:border-b">
              {/* product - start  */}

              {!cartData?.data || cartData?.data?.cartItems?.length === 0 ? (
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
            {!cartData?.data?.cartItems?.length ? (
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
                  onClick={() => handleOrderItem()}
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
