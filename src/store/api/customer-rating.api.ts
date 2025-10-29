import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const customerRatingApi = createApi({
  reducerPath: "customerRatingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/customer-rating`,
    credentials: "include",
  }),
  tagTypes: ["CustomerRating"],
  endpoints: (builder) => ({
    getAllCustomerRating: builder.query({
      query: () => ({
        url: `/all`,
        method: "GET",
      }),
      providesTags: ["CustomerRating"],
    }),

    createCustomerRating: builder.mutation({
      query: (data) => ({
        url: `/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomerRating"],
    }),

    updateCustomerRating: builder.mutation({
      query: (data) => ({
        url: `/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CustomerRating"],
    }),

    deleteCustomerRating: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomerRating"],
    }),
    userRatedBefore: builder.query({
      query: () => ({
        url: `/user-rated-before`,
        method: "GET",
      }),
      providesTags: ["CustomerRating"],
    }),
  }),
});

export const {
  useGetAllCustomerRatingQuery,
  useCreateCustomerRatingMutation,
  useUpdateCustomerRatingMutation,
  useDeleteCustomerRatingMutation,
  useUserRatedBeforeQuery,
} = customerRatingApi;
