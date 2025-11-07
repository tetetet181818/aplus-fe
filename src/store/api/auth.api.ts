import { UpdateUserInfo } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/auth`,
    credentials: "include",
  }),
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => ({
        url: `/check-auth`,
        method: "GET",
      }),
      providesTags: ["Auth", "User"],
      keepUnusedDataFor: 300,
    }),

    verify: builder.mutation({
      query: ({ token }: { token: string }) => `/verify?token=${token}`,
      invalidatesTags: ["Auth", "User"],
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    getUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ["Auth", "User"],
    }),

    deleteAccount: builder.mutation({
      query: () => ({
        url: "/delete-account",
        method: "DELETE",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    updateUserInfo: builder.mutation({
      query: (data: UpdateUserInfo) => ({
        url: `/update-user`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forget-password",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    resetPassword: builder.mutation({
      query: ({
        userId,
        resetPasswordToken,
        newPassword,
      }: {
        userId: string;
        resetPasswordToken: string;
        newPassword: string;
      }) => ({
        url: `/reset-password`,
        method: "POST",
        body: { userId, resetPasswordToken, newPassword },
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    getUserById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth", "User"],
    }),

    getAllUsers: builder.query({
      query: ({
        page,
        limit,
        fullName,
      }: {
        page: number;
        limit: number;
        fullName: string;
      }) => ({
        url: `/all-users?page=${page}&limit=${limit}&fullName=${fullName}`,
        method: "GET",
      }),
      providesTags: ["Auth", "User"],
    }),
  }),
});

export const {
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
  useVerifyMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useDeleteAccountMutation,
  useUpdateUserInfoMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
} = authApi;
