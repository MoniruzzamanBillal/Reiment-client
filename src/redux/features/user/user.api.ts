import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ! for getting all user
    getUser: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
    }),

    // ! get loggedIn user
    getLoggedInUser: builder.query({
      query: () => {
        return {
          url: "/users/logged-user",
          method: "GET",
        };
      },
    }),

    // ! for updating a user
    updateUser: builder.mutation({
      query: (payload) => {
        return {
          url: "/users/update-user",
          method: "PATCH",
          body: payload,
        };
      },
    }),

    //
  }),
});

export const {
  useGetUserQuery,
  useGetLoggedInUserQuery,
  useUpdateUserMutation,
} = userApi;
