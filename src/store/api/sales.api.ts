import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/sales`,
    credentials: "include",
  }),
  tagTypes: ["Sales"],
  endpoints: (builder) => ({
    getSingleSale: builder.query({
      query: ({ saleId }: { saleId: string }) => ({
        url: `/${saleId}`,
        method: "GET",
      }),
      providesTags: ["Sales"],
    }),
  }),
});

export const { useGetSingleSaleQuery } = salesApi;
