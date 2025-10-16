import { withdrawalData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

/**
 * RTK Query API for managing withdrawals:
 * - Fetch, create, update, and delete withdrawal requests
 */
export const withdrawalApi = createApi({
  reducerPath: "withdrawalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/withdrawals`,
    credentials: "include",
  }),
  tagTypes: ["Withdrawal"],

  endpoints: (builder) => ({
    /** Fetch withdrawals of the current user */
    getMeWithdrawals: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["Withdrawal"],
    }),

    /** Create a new withdrawal request */
    createWithdrawal: builder.mutation({
      query: ({ withdrawalData }: { withdrawalData: withdrawalData }) => ({
        url: "/create",
        method: "POST",
        body: withdrawalData,
      }),
      invalidatesTags: ["Withdrawal"],
    }),

    /** Fetch all withdrawals (admin use) */
    getAllWithdrawals: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Withdrawal"],
    }),

    /** Fetch a single withdrawal by ID */
    getSingleWithdrawal: builder.query({
      query: ({ withdrawalId }: { withdrawalId: string }) => ({
        url: `/${withdrawalId}`,
        method: "GET",
      }),
      providesTags: ["Withdrawal"],
    }),

    /** Update a withdrawal by ID */
    updateWithdrawal: builder.mutation({
      query: ({ withdrawalId }: { withdrawalId: string }) => ({
        url: `/${withdrawalId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Withdrawal"],
    }),

    /** Delete a withdrawal by ID */
    deleteWithdrawal: builder.mutation({
      query: ({ withdrawalId }: { withdrawalId: string }) => ({
        url: `/${withdrawalId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Withdrawal"],
    }),
  }),
});

export const {
  useCreateWithdrawalMutation,
  useGetAllWithdrawalsQuery,
  useGetSingleWithdrawalQuery,
  useUpdateWithdrawalMutation,
  useDeleteWithdrawalMutation,
  useGetMeWithdrawalsQuery,
} = withdrawalApi;
