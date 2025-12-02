import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT
    : process.env.NEXT_PUBLIC_SERVER_PRODUCTION;

/**
 * RTK Query API for managing user notifications:
 * - Fetch notifications
 * - Mark as read
 * - Read all
 * - Clear all
 */
export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/notifications`,
    credentials: 'include',
  }),
  tagTypes: ['Notification'],

  endpoints: builder => ({
    /** Fetch all user notifications */
    getUserNotifications: builder.query({
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),

    /** Mark all notifications as read */
    readAllNotification: builder.mutation({
      query: () => ({
        url: `/read-all`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),

    /** Clear all notifications */
    clearAllNotification: builder.mutation({
      query: () => ({
        url: `/clear-all`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),

    /** Mark a single notification as read */
    makeNotificationRead: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetUserNotificationsQuery,
  useReadAllNotificationMutation,
  useClearAllNotificationMutation,
  useMakeNotificationReadMutation,
} = notificationsApi;
