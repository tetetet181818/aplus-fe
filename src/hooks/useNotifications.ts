'use client'

import {
  useClearAllNotificationMutation,
  useMakeNotificationReadMutation,
  useReadAllNotificationMutation,
  useGetUserNotificationsQuery,
} from '@/store/api/notification.api'

/**
 * Custom hook for handling user notifications:
 * - Fetch all notifications
 * - Mark as read
 * - Clear all
 * - Read all
 */
export default function useNotifications() {
  /** Fetch user notifications */
  const {
    data: notifications,
    isLoading: notificationLoading,
    refetch,
  } = useGetUserNotificationsQuery({})

  const [readAllNotification, { isLoading: readAllLoading }] =
    useReadAllNotificationMutation()

  const [clearAllNotification, { isLoading: clearAllLoading }] =
    useClearAllNotificationMutation()

  /** Clear all notifications */
  const handelClearAllNotification = async () => {
    const res = await clearAllNotification(undefined)
    if (res) refetch()
  }

  /** Mark all notifications as read */
  const handleReadAllNotification = async () => {
    const res = await readAllNotification(undefined)
    if (res) refetch()
  }

  const [makeNotificationRead] = useMakeNotificationReadMutation()

  /** Mark single notification as read */
  const handleMakeNotificationRead = async (id: string) => {
    const res = await makeNotificationRead({ id })
    if (res) refetch()
  }

  return {
    notifications: notifications?.data,
    notificationLoading,
    readAllLoading,
    clearAllLoading,
    handleReadAllNotification,
    handelClearAllNotification,
    handleMakeNotificationRead,
  }
}
