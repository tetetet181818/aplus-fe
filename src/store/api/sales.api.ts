import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const salesApi = createApi({
  reducerPath: 'salesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/sales`,
    credentials: 'include',
  }),
  tagTypes: ['Sales'],
  endpoints: builder => ({
    getSingleSale: builder.query({
      query: ({ saleId }: { saleId: string }) => ({
        url: `/${saleId}`,
        method: 'GET',
      }),
      providesTags: ['Sales'],
    }),

    getSalesUser: builder.query({
      query: ({ page, limit }) => ({
        url: `/get-sales-user?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Sales'],
    }),

    getSalesUserStats: builder.query({
      query: (sellerId: string) => ({
        url: `/stats/${sellerId}`,
        method: 'GET',
      }),
      providesTags: ['Sales'],
    }),

    getUserStatisticsSales: builder.query({
      query: () => ({
        url: `/get-user-statistics-sales`,
        method: 'GET',
      }),
      providesTags: ['Sales'],
    }),
    getDetailsNoteSales: builder.query({
      query: ({
        noteId,
        page,
        limit,
      }: {
        noteId: string;
        page: number;
        limit: number;
      }) => ({
        url: `/get-sales-note/${noteId}?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Sales'],
    }),
  }),
});

export const {
  useGetSingleSaleQuery,
  useGetSalesUserQuery,
  useGetSalesUserStatsQuery,
  useGetUserStatisticsSalesQuery,
  useGetDetailsNoteSalesQuery,
} = salesApi;
