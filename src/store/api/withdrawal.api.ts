import { withdrawalData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const withdrawalApi = createApi({
  reducerPath: "withdrawalApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/withdrawals` }),
  tagTypes: ["Withdrawal"],

  endpoints: (builder) => ({
    createWithdrawal: builder.mutation({
      query: ({
        token,
        withdrawalData,
      }: {
        token: string;
        withdrawalData: withdrawalData;
      }) => ({
        url: "/create",
        method: "POST",
        body: withdrawalData,
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getAllWithdrawals: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "/",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    getSingleWithdrawal: builder.query({
      query: ({
        withdrawalId,
        token,
      }: {
        withdrawalId: string;
        token: string;
      }) => ({
        url: `/${withdrawalId}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    updateWithdrawal: builder.mutation({
      query: ({
        withdrawalId,
        token,
      }: {
        withdrawalId: string;
        token: string;
      }) => ({
        url: `/${withdrawalId}`,
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),

    deleteWithdrawal: builder.mutation({
      query: ({
        withdrawalId,
        token,
      }: {
        withdrawalId: string;
        token: string;
      }) => ({
        url: `/${withdrawalId}`,
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateWithdrawalMutation,
  useGetAllWithdrawalsQuery,
  useGetSingleWithdrawalQuery,
  useUpdateWithdrawalMutation,
  useDeleteWithdrawalMutation,
} = withdrawalApi;
