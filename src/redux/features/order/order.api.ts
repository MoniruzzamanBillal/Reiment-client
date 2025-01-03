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

    //
  }),
});

export const {
  useGetAllOrderQuery,
  useGetSingleDataQuery,
  useApproveOrderMutation,
  useCancelOrderMutation,
} = orderApi;
