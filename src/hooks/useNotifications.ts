'use client';

import { notificationService } from '@/services/notification.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useNotifications() {
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading: notificationLoading,
    refetch,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.getUserNotifications,
  });

  const { mutateAsync: readAllNotification, isPending: readAllLoading } =
    useMutation({
      mutationFn: notificationService.readAllNotification,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
    });

  const { mutateAsync: clearAllNotification, isPending: clearAllLoading } =
    useMutation({
      mutationFn: notificationService.clearAllNotification,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
    });

  const { mutateAsync: makeNotificationRead } = useMutation({
    mutationFn: notificationService.makeNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handelClearAllNotification = async () => {
    const res = await clearAllNotification();
    if (res) refetch();
  };

  const handleReadAllNotification = async () => {
    const res = await readAllNotification();
    if (res) refetch();
  };

  const handleMakeNotificationRead = async (id: string) => {
    const res = await makeNotificationRead(id);
    if (res) refetch();
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
