import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ! for checking eligibility for review
    checkReviewEligibility: builder.query({
      query: (id: string) => {
        return {
          url: `/review/check-review-eligible/${id}`,
          method: "GET",
        };
      },
    }),

    // ! for giving review
    giveReview: builder.mutation({
      query: (payload) => {
        return {
          url: "/review/give-review",
          method: "POST",
          body: payload,
        };
      },
    }),

    // ! for getting product review
    productReview: builder.query({
      query: (id: string) => {
        return {
          url: `/review/product-review/${id}`,
          method: "GET",
        };
      },
    }),

    // ! for updating review
    updateReview: builder.mutation({
      query: (payload) => {
        return {
          url: "/review/update-review",
          method: "PATCH",
          body: payload,
        };
      },
    }),

    //
  }),
});

export const {
  useCheckReviewEligibilityQuery,
  useGiveReviewMutation,
  useProductReviewQuery,
  useUpdateReviewMutation,
} = reviewApi;
