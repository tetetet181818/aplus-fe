"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  notificationsApi,
  useClearAllNotificationMutation,
  useMakeNotificationReadMutation,
  useReadAllNotificationMutation,
} from "@/store/api/notification.api";
import { useGetUserNotificationsQuery } from "@/store/api/notification.api";
import { notificationType } from "@/types";
import useAuth from "./useAuth";

/**
 * Custom hook to:
 * - Fetch all notifications for a user
 * - Listen for new real-time notifications via Socket.IO
 * - Play sound and show browser notification when a new one arrives
 */
export default function useNotifications(userId: string) {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (!userId) return;

    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:9090"
        : "https://aplus-backend.onrender.com";

    const socket = io(url, { query: { userId } });

    // ✅ Listen for new notification events
    socket.on("notification", (notif: notificationType) => {
      playSound();
      showBrowserNotification(notif);

      // Refresh cache for latest notifications
      dispatch(notificationsApi.util.invalidateTags(["Notification"]));
      refetch();
    });

    return () => socket.disconnect();
  }, [userId, dispatch, refetch]);

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

function playSound() {
  const audio = new Audio("/notification.mp3");
  audio.play().catch(() => {});
}

function showBrowserNotification(notif: notificationType) {
  if (typeof window === "undefined") return;

  if (Notification.permission === "granted") {
    new Notification(notif.title, { body: notif.message });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }
}
