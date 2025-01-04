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

    //
  }),
});

//
export const { useAddToCartMutation, useGetUserCartQuery } = cartApi;
