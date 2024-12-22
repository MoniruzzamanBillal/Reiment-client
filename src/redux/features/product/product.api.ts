import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ! for getting all products
    getAllProducts: builder.query({
      query: () => {
        return {
          url: `/product/all-products`,
          method: "GET",
        };
      },
    }),

    // ! for adding product
    addProduct: builder.mutation({
      query: (payload) => {
        return {
          url: "/product/create-product",
          method: "POST",
          body: payload,
        };
      },
    }),

    //
  }),
});

//
export const { useGetAllProductsQuery, useAddProductMutation } = productApi;
