import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/sales` }),
  tagTypes: ["Sales"],
  endpoints: (builder) => ({
    getSingleSale: builder.query({
      query: ({ token, saleId }: { token: string; saleId: string }) => ({
        url: `/${saleId}`,
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Sales"],
    }),
  }),
});

export const { useGetSingleSaleQuery } = salesApi;
