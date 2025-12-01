import { AcceptedWithdrawal } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

/**
 * Dashboard API slice - handles all admin dashboard requests.
 */
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/dashboard`,
    credentials: 'include',
  }),
  tagTypes: ['Dashboard'],
  endpoints: builder => ({
    /** Get main dashboard overview data */
    getOverview: builder.query({
      query: () => ({
        url: '/overview',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Fetch paginated users list with filters */
    getAllUsers: builder.query({
      query: ({
        page,
        limit,
        fullName,
        university,
        emailFilter,
      }: {
        page: number;
        limit: number;
        fullName: string;
        university: string;
        emailFilter: string;
      }) => ({
        url: `/users?page=${page}&limit=${limit}&fullName=${fullName}&university=${university}&email=${emailFilter}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Delete user by ID */
    deleteUser: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Dashboard'],
    }),

    /** Get user statistics */
    getUsersStats: builder.query({
      query: () => ({
        url: '/users/stats',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Search for users with filters */
    searchUsers: builder.query({
      query: ({
        fullName,
        email,
        university,
        createdAt,
      }: {
        fullName?: string;
        email?: string;
        university?: string;
        createdAt?: string;
      }) => ({
        url: `/users/search?fullName=${fullName}&email=${email}&university=${university}&createdAt=${createdAt}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Get notes statistics */
    getNotesStats: builder.query({
      query: () => ({
        url: '/notes/stats',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Get all notes with filters and sorting */
    getAllNotes: builder.query({
      query: ({
        page,
        limit,
        title,
        university,
        collage,
        year,
        sortBy,
        sortOrder,
      }: {
        page: number;
        limit: number;
        title: string;
        university: string;
        collage: string;
        year: string;
        sortBy: string;
        sortOrder: string;
      }) => ({
        url: `/notes?page=${page}&limit=${limit}&title=${title}&university=${university}&collage=${collage}&year=${year}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Publish a note */
    makeNotePublish: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/notes/${id}/publish`,
        method: 'POST',
      }),
      invalidatesTags: ['Dashboard'],
    }),

    /** Unpublish a note */
    makeNoteUnpublish: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/notes/${id}/unpublish`,
        method: 'POST',
      }),
      invalidatesTags: ['Dashboard'],
    }),

    /** Get all sales data */
    getAllSales: builder.query({
      query: ({
        page,
        limit,
        status,
        id,
        invoiceId,
      }: {
        page: number;
        limit: number;
        status?: string;
        id?: string;
        invoiceId?: string;
      }) => ({
        url: `/sales?page=${page}&limit=${limit}&status=${status}&id=${id}&invoiceId=${invoiceId}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Get sales statistics */
    getSalesStats: builder.query({
      query: () => ({
        url: '/sales/stats',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Get sales by ID */
    getSalesById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/sales/${id}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Get all withdrawals with filters */
    getAllWithdrawals: builder.query({
      query: ({
        page = 1,
        limit = 10,
        status,
        iban,
        startDate,
        endDate,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      }: {
        page?: number;
        limit?: number;
        status?: string;
        iban?: string;
        startDate?: string;
        endDate?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
      }) => ({
        url: `/withdrawals?page=${page}&limit=${limit}&status=${status}&iban=${iban}&startDate=${startDate}&endDate=${endDate}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Get withdrawal statistics */
    getWithdrawalStats: builder.query({
      query: () => ({
        url: '/withdrawals/stats',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Get all withdrawal statuses */
    getWithdrawalStatuses: builder.query({
      query: () => ({
        url: '/withdrawals/statuses',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),

    /** Mark withdrawal as accepted */
    acceptedWithdrawal: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/withdrawals/${id}/accepted`,
        method: 'POST',
      }),
      invalidatesTags: ['Dashboard'],
    }),

    /** Mark withdrawal as rejected */
    rejectedWithdrawal: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/withdrawals/${id}/rejected`,
        method: 'POST',
      }),
      invalidatesTags: ['Dashboard'],
    }),

    /** Mark withdrawal as completed with data */
    completedWithdrawal: builder.mutation({
      query: ({ id, data }: { id: string; data: AcceptedWithdrawal }) => ({
        url: `/withdrawals/${id}/completed`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Dashboard'],
    }),

    /** Get single withdrawal by ID */
    getSingleWithdrawal: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/withdrawals/${id}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
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
