import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION

export const profitsApi = createApi({
  reducerPath: 'profitsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/profits`,
    credentials: 'include',
  }),
  tagTypes: ['Profits'],
  endpoints: (builder) => ({
    getProfits: builder.query({
      query: ({
        page,
        limit,
        fullName,
        email,
      }: {
        page: number
        limit: number
        fullName: string
        email: string
      }) => ({
        url: `?page=${page}&limit=${limit}&fullName=${fullName}&email=${email}`,
        method: 'GET',
      }),
      providesTags: ['Profits'],
      keepUnusedDataFor: 300,
    }),
  }),
})

export const { useGetProfitsQuery } = profitsApi
