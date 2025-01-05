import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ! for getting all order
    getAllOrder: builder.query({
      query: () => {
        return {
          url: `/order/all-order`,
          method: "GET",
        };
      },
      providesTags: ["allOrder"],
    }),

    // ! for getting all order
    getAllUserOrder: builder.query({
      query: () => {
        return {
          url: `/order/user-order`,
          method: "GET",
        };
      },
      providesTags: ["allUserOrder"],
    }),

    // ! for getting single order data
    getSingleData: builder.query({
      query: (id: string) => {
        return {
          url: `/order/detail/${id}`,
          method: "GET",
        };
      },
    }),

    // ! for approving order
    approveOrder: builder.mutation({
      query: (id: string) => {
        return {
          url: `/order/approve-order/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["allOrder"],
    }),

    // ! for canceling order
    cancelOrder: builder.mutation({
      query: (id: string) => {
        return {
          url: `/order/cancel-order/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["allOrder"],
    }),

    // ! for ordering from cart page
    orderFromCart: builder.mutation({
      query: (payload) => {
        return {
          url: `/order/cart-order`,
          method: "POST",
          body: payload,
        };
      },
    }),

    // ! for ordering directly from product detail
    directOrder: builder.mutation({
      query: (payload) => {
        return {
          url: `/order/direct-order`,
          method: "POST",
          body: payload,
        };
      },
    }),

    //
  }),
});

export const {
  useGetAllOrderQuery,
  useGetSingleDataQuery,
  useApproveOrderMutation,
  useCancelOrderMutation,
  useOrderFromCartMutation,
  useDirectOrderMutation,
  useGetAllUserOrderQuery,
} = orderApi;
