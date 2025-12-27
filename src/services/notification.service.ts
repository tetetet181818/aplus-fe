import { axiosInstance } from '@/utils/apiConfig';

export const notificationService = {
  getUserNotifications: async () => {
    const { data } = await axiosInstance.get('/notifications');
    return data;
  },

  readAllNotification: async () => {
    const { data } = await axiosInstance.patch('/notifications/read-all');
    return data;
  },

  clearAllNotification: async () => {
    const { data } = await axiosInstance.delete('/notifications/clear-all');
    return data;
  },

  makeNotificationRead: async (id: string) => {
    const { data } = await axiosInstance.patch(`/notifications/${id}/read`);
    return data;
  },
};
