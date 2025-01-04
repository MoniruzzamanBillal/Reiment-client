import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ! for getting user cart
    getUserCart: builder.query({
      query: () => {
        return {
          url: `/cart/user-cart`,
          method: "GET",
        };
      },
      providesTags: ["userCart"],
    }),

    // ! for adding item in cart
    addToCart: builder.mutation({
      query: (payload) => {
        return {
          url: "/cart/add-to-cart",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["userCart"],
    }),

    // ! for removing item from cart
    removeCartItem: builder.mutation({
      query: (payload) => {
        return {
          url: "/cart/remove-cart-item",
          method: "PATCH",
          body: payload,
        };
      },
    }),

    // ! for adding item quantity
    addItemQuantity: builder.mutation({
      query: (payload) => {
        return {
          url: "/cart/add-cart-item-quantity",
          method: "PATCH",
          body: payload,
        };
      },
    }),

    // ! for removing item quantity
    decreaseItemQuantity: builder.mutation({
      query: (payload) => {
        return {
          url: "/cart/decrease-cart-item-quantity",
          method: "PATCH",
          body: payload,
        };
      },
    }),

    //
  }),
});

//
export const {
  useAddToCartMutation,
  useGetUserCartQuery,
  useRemoveCartItemMutation,
  useAddItemQuantityMutation,
  useDecreaseItemQuantityMutation,
} = cartApi;
