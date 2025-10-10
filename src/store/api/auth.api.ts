import { UpdateUserInfo } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/auth` }),
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: ({ token }: { token: string }) => ({
        url: `/check-auth`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Auth", "User"],
    }),

    verify: builder.mutation({
      query: (token) => `/verify?token=${token}`,
      invalidatesTags: ["Auth"],
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
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    deleteAccount: builder.mutation({
      query: ({ token }: { token: string }) => ({
        url: "/delete-account",
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    updateUserInfo: builder.mutation({
      query: ({ token, data }: { token: string; data: UpdateUserInfo }) => ({
        url: `/update-user`,
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
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
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Auth", "User"],
    }),

    getAllUsers: builder.query({
      query: ({
        token,
        page,
        limit,
        fullName,
      }: {
        token: string;
        page: number;
        limit: number;
        fullName: string;
      }) => ({
        url: `/all-users?page=${page}&limit=${limit}&fullName=${fullName}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Auth", "User"],
    }),
    signWithGoogle: builder.mutation({
      query: () => "/google/login",
      invalidatesTags: ["Auth", "User"],
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
  useUpdateUserInfoMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useSignWithGoogleMutation,
} = authApi;
