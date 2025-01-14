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

    //
  }),
});

export const { useCheckReviewEligibilityQuery, useGiveReviewMutation } =
  reviewApi;
