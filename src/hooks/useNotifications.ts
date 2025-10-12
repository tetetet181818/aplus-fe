"use client";

import {
  useClearAllNotificationMutation,
  useMakeNotificationReadMutation,
  useReadAllNotificationMutation,
} from "@/store/api/notification.api";
import { useGetUserNotificationsQuery } from "@/store/api/notification.api";
import useAuth from "./useAuth";

/**
 * Custom hook to:
 * - Fetch all notifications for a user
 */
export default function useNotifications() {
  const { token } = useAuth();

  const {
    data: notifications,
    isLoading: notificationLoading,
    refetch,
  } = useGetUserNotificationsQuery({ token: token || "" });

  const [readAllNotification, { isLoading: readAllLoading }] =
    useReadAllNotificationMutation();

  const [clearAllNotification, { isLoading: clearAllLoading }] =
    useClearAllNotificationMutation();

  const handelClearAllNotification = async () => {
    const res = await clearAllNotification({ token: token || "" });
    if (res) {
      refetch();
    }
  };

  const handleReadAllNotification = async () => {
    const res = await readAllNotification({ token: token || "" });
    if (res) {
      refetch();
    }
  };

  const [makeNotificationRead] = useMakeNotificationReadMutation();

  const handleMakeNotificationRead = async (id: string) => {
    const res = await makeNotificationRead({ token: token || "", id });
    if (res) {
      refetch();
    }
  };

  return {
    notifications: notifications?.data,
    notificationLoading,
    readAllLoading,
    clearAllLoading,
    handleReadAllNotification,
    handelClearAllNotification,
    handleMakeNotificationRead,
  };
}
