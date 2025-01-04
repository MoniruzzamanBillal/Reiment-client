import { baseApi } from "@/redux/api/baseApi";

const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ! for adding address
    addAddress: builder.mutation({
      query: (payload) => {
        return {
          url: "/address/add-user-address",
          method: "POST",
          body: payload,
        };
      },
    }),

    // ! for updating address
    updateAddress: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/address/update-user-address/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
    }),

    // ! for getting user address
    getUserAddress: builder.query({
      query: () => {
        return {
          url: "/address",
          method: "GET",
        };
      },
    }),

    //
  }),
});

//
export const {
  useAddAddressMutation,
  useUpdateAddressMutation,
  useGetUserAddressQuery,
} = addressApi;
