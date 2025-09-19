import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/auth` }),
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: (token) => ({
        url: `/check-auth`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    verify: builder.mutation({
      query: (token) => `/verify?token=${token}`,
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    deleteAccount: builder.mutation({
      query: () => ({
        url: "/delete-account",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCheckAuthQuery,
  useVerifyMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useDeleteAccountMutation,
} = authApi;
