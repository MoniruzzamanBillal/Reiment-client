import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ! for getting all products
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([Key, value]) => {
            if (value) {
              params.append(Key, value.toString());
            }
          });
        }

        return {
          url: `/product/all-products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["allProducts"],
    }),

    // ! for getting single product
    getSingleProducts: builder.query({
      query: (id: string) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["getSingleProduct"],
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
      invalidatesTags: ["allProducts"],
    }),

    // ! for updating product
    updateProduct: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/product/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["allProducts"],
    }),

    // ! for deleting product
    deleteProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `/product/delete/${id}`,
          method: "PATCH",
        };
      },
    }),

    //
  }),
});

//
export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useGetSingleProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
