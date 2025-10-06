import { AcceptedWithdrawal } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/dashboard` }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "/overview",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    getAllUsers: builder.query({
      query: ({
        token,
        page,
        limit,
      }: {
        token: string;
        page: number;
        limit: number;
      }) => ({
        url: `/users?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    deleteUser: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getUsersStats: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "/users/stats",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    searchUsers: builder.query({
      query: ({
        token,
        fullName,
        email,
        university,
        createdAt,
      }: {
        token: string;
        fullName?: string;
        email?: string;
        university?: string;
        createdAt?: string;
      }) => ({
        url: `/users/search?fullName=${fullName}&email=${email}&university=${university}&createdAt=${createdAt}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    getNotesStats: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "/notes/stats",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),

    getAllNotes: builder.query({
      query: ({
        token,
        page,
        limit,
      }: {
        token: string;
        page: number;
        limit: number;
      }) => ({
        url: `/notes?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    makeNotePublish: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/notes/${id}/publish`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Dashboard"],
    }),
    makeNoteUnpublish: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/notes/${id}/unpublish`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Dashboard"],
    }),

    getAllSales: builder.query({
      query: ({
        token,
        page,
        limit,
      }: {
        token: string;
        page: number;
        limit: number;
      }) => ({
        url: `/sales?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),

    getSalesStats: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "/sales/stats",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),

    getSalesById: builder.query({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/sales/${id}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),

    getAllWithdrawals: builder.query({
      query: ({
        token,
        page,
        limit,
      }: {
        token: string;
        page: number;
        limit: number;
      }) => ({
        url: `/withdrawals?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),

    getWithdrawalStats: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "/withdrawals/stats",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    getWithdrawalStatuses: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "/withdrawals/statuses",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),

    acceptedWithdrawal: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/withdrawals/${id}/accepted`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Dashboard"],
    }),

    rejectedWithdrawal: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/withdrawals/${id}/rejected`,
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Dashboard"],
    }),

    completedWithdrawal: builder.mutation({
      query: ({
        token,
        id,
        data,
      }: {
        token: string;
        id: string;
        data: AcceptedWithdrawal;
      }) => ({
        url: `/withdrawals/${id}/completed`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getSingleWithdrawal: builder.query({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/withdrawals/${id}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUsersStatsQuery,
  useSearchUsersQuery,
  useGetNotesStatsQuery,
  useGetAllNotesQuery,
  useMakeNotePublishMutation,
  useMakeNoteUnpublishMutation,
  useGetAllSalesQuery,
  useGetSalesStatsQuery,
  useGetSalesByIdQuery,
  useGetAllWithdrawalsQuery,
  useGetWithdrawalStatsQuery,
  useGetWithdrawalStatusesQuery,
  useAcceptedWithdrawalMutation,
  useRejectedWithdrawalMutation,
  useCompletedWithdrawalMutation,
  useGetSingleWithdrawalQuery,
} = dashboardApi;
