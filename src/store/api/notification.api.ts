import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/notifications` }),
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    getUserNotifications: builder.query({
      query: ({ token }: { token: string }) => ({
        url: `/`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["Notification"],
    }),
    readAllNotification: builder.mutation({
      query: ({ token }: { token: string }) => ({
        url: `/read-all`,
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Notification"],
    }),

    clearAllNotification: builder.mutation({
      query: ({ token }: { token: string }) => ({
        url: `/clear-all`,
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Notification"],
    }),

    makeNotificationRead: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `${id}/read`,
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetUserNotificationsQuery,
  useReadAllNotificationMutation,
  useClearAllNotificationMutation,
  useMakeNotificationReadMutation,
} = notificationsApi;
