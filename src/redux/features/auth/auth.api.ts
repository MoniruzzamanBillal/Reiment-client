import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ! for login
    logIn: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/log-in",
          method: "POST",
          body: payload,
        };
      },
    }),

    // ! for sending reset link
    sendResetLink: builder.mutation({
      query: (email: string) => {
        return {
          url: `/auth/reset-link/${email}`,
          method: "PATCH",
        };
      },
    }),

    // ! for reseting password
    resetPassword: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/reset-password`,
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
  useLogInMutation,
  useSendResetLinkMutation,
  useResetPasswordMutation,
} = authApi;
